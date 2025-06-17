import { connectDB } from "@/lib/mongodb";
import Review from "@/app/models/Review";
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

    const addedBy = decoded?.user_id;
    if (!addedBy) {
      return new Response(
        JSON.stringify({ success: false, message: "User ID missing in token" }),
        { status: 401 }
      );
    }

    await connectDB();

    const formData = await req.formData();
    const propertyId = formData.get("propertyId");
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment");

    if (!propertyId || !rating || !comment) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields" }),
        { status: 400 }
      );
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ success: false, message: "Rating must be between 1 and 5" }),
        { status: 400 }
      );
    }

    const newReview = await Review.create({
      review_id: uuidv4(),
      user_id:addedBy,
      rating_description: comment,
      rating,
      propertyId,
    });

    return Response.json({
      status: 200,
      message: "Review Submitted",
      data: newReview,
    });
  } catch (error) {
    console.error("Review POST error:", error);
    return Response.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
