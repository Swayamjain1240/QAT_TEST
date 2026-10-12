import mongoose from "mongoose";

export const connectDB = async (req,res) => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("database connect successfully");
    } catch (error) {
        console.error("error in connect database", error);
        process.exit(1);
    }
}