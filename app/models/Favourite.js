import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  favourite_id: String,
  user_id: String,
  property_id: String,
  favourite_status: {
    type: Boolean,
    default: false,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Favourite ||
  mongoose.model("Favourite", favouriteSchema);
