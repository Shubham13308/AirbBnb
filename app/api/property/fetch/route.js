import { connectDB } from "@/lib/mongodb";
import Property from "@/app/models/Property";
import Favourite from "@/app/models/Favourite";
import { verifyToken } from "@/utils/auth";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    let decodedUser = null;
    let userId = null;

    if (token) {
      const { valid, message, status } = await verifyToken(req);
      if (!valid) {
        return new Response(JSON.stringify({ success: false, message }), { status });
      }

      decodedUser = jwt.verify(token, JWT_SECRET);
      userId = decodedUser?.user_id;
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const country = searchParams.get("country") || "";

    const isDefault = (val) => val === "0" || val === "";
    const filter = {};

    if (!isDefault(category)) filter.category = category;
    if (!isDefault(search)) filter.property_name = { $regex: search, $options: "i" };
    if (!isDefault(country)) filter.country = country;

    const properties = await Property.aggregate([
      ...(Object.keys(filter).length ? [{ $match: filter }] : []),
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
    $lookup: {
      from: "reviews",              
      localField: "property_id",   
      foreignField: "propertyId",  
      as: "reviews",
    },
  },
   {
   $addFields: {
  reviewsCount: { $size: "$reviews" },
  averageRating: {
    $cond: [
      { $gt: [{ $size: "$reviews" }, 0] }, 
      {
        $avg: {
          $map: {
            input: "$reviews",
            as: "r",
            in: { $toDouble: "$$r.rating" }, 
          },
        },
      },
      null,
    ],
  },
}

  },

      ...(userId
        ? [
            {
              $lookup: {
                from: "favourites",
                let: { propertyId: "$property_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$property_id", "$$propertyId"] },
                          { $eq: ["$user_id", userId] },
                        ],
                      },
                    },
                  },
                ],
                as: "favouriteData",
              },
            },
            {
              $addFields: {
                isFavourite: { $gt: [{ $size: "$favouriteData" }, 0] },
              },
            },
            {
              $project: {
                favouriteData: 0,
              },
            },
          ]
        : []),
    ]);

    const favourites = userId
      ? await Favourite.aggregate([
          { $match: { user_id: userId } },
          {
            $lookup: {
              from: "properties",
              localField: "property_id",
              foreignField: "property_id",
              as: "propertyDetails",
            },
          },
          {
            $unwind: {
              path: "$propertyDetails",
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
      : [];

    const userData = {
      name: decodedUser?.name,
      email: decodedUser?.email,
      userId:decodedUser?.user_id
    };

    return new Response(
      JSON.stringify({
        success: true,
        status: 200,
        data: properties,
        favourites,
        userData,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch properties",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
