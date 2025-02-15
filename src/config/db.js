import mongoose from "mongoose";
import config from "./config.js";

const dbConnect = async () => {
    try {
        const mongoURI = config.MONGODB_URI;
        await mongoose.connect(mongoURI);
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

export default dbConnect;
