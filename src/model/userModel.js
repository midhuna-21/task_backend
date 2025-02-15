import mongoose, { Document, Types, Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        image: {
            type: String,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

const user = mongoose.model("user", userSchema);
export { user };
