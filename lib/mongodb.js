import mongoose from "mongoose";

let isConnected=false;

export const connectDB= async()=>{
    if(isConnected) return ;

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'airbnb'
        });
        isConnected = true
        console.log("Connected to MongoDB");
        

    }
    catch (error){
        console.error("Mongodb",error)

    }

}
