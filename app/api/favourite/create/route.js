import { connectDB } from "@/lib/mongodb";
import Favourite from "@/app/models/Favourite";
import { verifyToken } from "@/utils/auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { valid, message, status, decoded } = await verifyToken(req);

    if (!valid) {
      return new Response(JSON.stringify({ success: false, message }), {
        status,
      });
    }

    await connectDB();
    const formData = await req.formData();
    const user_id = formData.get("user_id");
    const property_id = formData.get("property_id");
    const property_status = formData.get("status");
    const fav = formData.get("fav");

    if (!user_id || !property_id || !property_status) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }
   
    if (property_status === "0") {
   
      const deletedFav = await Favourite.findOneAndDelete({ property_id: property_id });

      if (deletedFav) {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Favorite removed successfully",
            favourite_status: false,
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to remove favorite",
          }),
          { status: 500 }
        );
      }
    }

    const favouriteStatusBoolean = property_status === "1";

    const newFavourite = await Favourite.create({
      favourite_id: uuidv4(),
      user_id,
      property_id,
      favourite_status: favouriteStatusBoolean,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: newFavourite,
        favourite_status: favouriteStatusBoolean,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /favourite:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
