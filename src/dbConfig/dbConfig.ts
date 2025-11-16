import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log("Database connection error:", error);
    }