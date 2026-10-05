import mongoose from "mongoose";
export const connectdb=async()=>{
    await mongoose.connect("mongodb://localhost:27017/test",{serverSelectionTimeoutMS:5*1000})
    try {
        console.log("DB connect success ✔ ");
        
    } catch (error) {
        console.log("DB fail to connect ✖ ");
        
    }
}