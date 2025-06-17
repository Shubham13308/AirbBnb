import mongoose from "mongoose";

const bookingstatusSchema=new mongoose.Schema({
    bookingstatus_id:String,
    booking_id:String,
    booking_status:String,
    added_at:{
        type:Date,
        default:Date.now()
    }
})
export default mongoose.models.BookingStatus ||
mongoose.model("BookingStatus",bookingstatusSchema)