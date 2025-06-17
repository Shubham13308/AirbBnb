import { connectDB } from "@/lib/mongodb";

import { verifyToken } from "@/utils/auth";
import Property from "@/app/models/Property";

export async function POST(req) {
  try {
    await connectDB();

    const { valid, message, status, decoded } = await verifyToken(req);
    if (!valid) {
      return new Response(JSON.stringify({ success: false, message }), {
        status,
      });
    }

    const user_id = decoded?.user_id;
    if (!user_id) {
      return new Response(
        JSON.stringify({ success: false, message: "User ID missing in token" }),
        { status: 401 }
      );
    }
    

const properties = await Property.aggregate([
  {
    $match: {
      user_id: user_id 
    }
  },
  {
    $lookup: {
      from: 'reviews',
      localField: 'property_id',
      foreignField: 'propertyId',
      as: 'reviews'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: 'user_id',
      as: 'owner'
    }
  },
  {
    $unwind: {
      path: '$owner',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unwind: {
      path: '$reviews',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'reviews.user_id',
      foreignField: 'user_id',
      as: 'reviews_user'
    }
  },
  {
    $unwind: {
      path: '$reviews_user',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: '$_id',
      property_id: { $first: '$property_id' },
      property_name: { $first: '$property_name' },
      tagline: { $first: '$tagline' },
      image: { $first: '$image' },
      owner: { $first: '$owner' },
      reviews: {
        $push: {
          _id: '$reviews._id',
          rating: '$reviews.rating',
          rating_description: '$reviews.rating_description',
          comment: '$reviews.comment',
          createdAt: '$reviews.createdAt',
          user: '$reviews_user'
        }
      }
    }
  }
]);




    return new Response(
      JSON.stringify({
        success: true,
        data: properties,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch reviews by addedBy error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
