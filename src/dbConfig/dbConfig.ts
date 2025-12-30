import mongoose from "mongoose";

//TODOS FOR VERIFY EMAIL ROUTE AND MAILER FUNCTION
export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Database connected successfully");
        })

        connection.on('error', (err) => {
            console.log("Database connection failed" + err);
            process.exit();
        })
    } catch (error) {
        console.log("Database connection error:", error);
    }
}