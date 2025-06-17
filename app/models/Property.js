

import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    property_id: String,
    property_name: String,
    tagline: String,
    price: Number,
    category: String,
    country: String,
    image: String,
    guest: Number,
    bedrooms: Number,
    beds: Number,
    baths: Number,
    description: String,
    amenities: [String],
    user_id:String
    
  },
  { timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model("Property", propertySchema);
