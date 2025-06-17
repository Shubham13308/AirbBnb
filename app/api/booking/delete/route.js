// app/api/booking/delete/route.js
import { connectDB } from "@/lib/mongodb";
import Booking from "@/app/models/Booking";
import { verifyToken } from "@/utils/auth";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { valid, decoded, status, message } = await verifyToken(req);

    if (!valid) {
      return new Response(JSON.stringify({ success: false, message }), {
        status,
      });
    }

    await connectDB();

    const userId = decoded?.user_id;
    const formData= await req.formData();
    const booking_id = formData.get('booking')
  
    
    if (!booking_id) {
      return new Response(
        JSON.stringify({ success: false, message: "Booking ID is required." }),
        { status: 400 }
      );
    }

    const result = await Booking.deleteOne({
      booking_id: booking_id,
      user_id: userId,
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Booking not found or not authorized." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, deletedCount: result.deletedCount }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}

