import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  booking_id: String,
  from: String,
  to: String,
  totalnight: String,
  booking_price: String,
  property_id: String,
  user_id: String,
  booking_status:String,
  added_at: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Booking
  ? mongoose.model("Booking")
  : mongoose.model("Booking", bookingSchema);
