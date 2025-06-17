import { connectDB } from "@/lib/mongodb";
import Booking from "@/app/models/Booking";
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
    const from = formData.get("from");
    const to = formData.get("to");
    const totalnights = formData.get("totalnights");
    const bookingprice = formData.get("bookingprice");
    const property = formData.get("property");
    const booking_status = formData.get("booking_status") ?? "1";

    if (!from || !to || !totalnights || !bookingprice || !property) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields" }),
        { status: 400 }
      );
    }

    console.log(addedBy, "addedBy");

    const newBooking = await Booking.create({
      booking_id: uuidv4(),
      from,
      to,
      totalnight: totalnights,
      booking_price: bookingprice,
      property_id: property,
      user_id: addedBy,
      booking_status,
    });

    const bookingData = newBooking.toObject(); // Convert to plain object to expose all fields
    console.log(bookingData, "newBooking");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Booking Submitted Successfully",
        data: bookingData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking POST error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
