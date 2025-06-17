import { connectDB } from "@/lib/mongodb";
import Booking from "../models/Booking";

export async function expireOldBookings() {
  await connectDB();

  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; 

  await Booking.updateMany(
    { to: { $lt: todayString }, booking_status: "1" },
    { $set: { booking_status: "0" } }
  );

  console.log("Expired old bookings");
}