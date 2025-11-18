import mongoose from "mongoose";
import { envs } from "./config.env.js";

export const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(envs.MONGODB_URI);
        console.log(`MongoDB connectd: ${connect.connection.host}`);
    } catch (error) {
        console.log("error al conectar servidor", error);
        process.exit(1);
    }
};