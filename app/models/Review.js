import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
    review_id:String,
    user_id:String,
    propertyId:String,
    rating:String,
    rating_description:String,
    added_at:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.models.Review || 
 mongoose.model("Review",reviewSchema);