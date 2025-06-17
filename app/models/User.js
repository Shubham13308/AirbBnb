import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    user_id: { type: String, unique: true },
    username:{type:String},
    email:{type:String },
    password:{type:String},
    image:{type:String},
    flag :{type:String}
})
export default mongoose.models.User || mongoose.model('User', UserSchema);
