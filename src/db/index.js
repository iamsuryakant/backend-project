import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {

        const connectionManager = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("\n MONGODB Connection Success: ", connectionManager.connection.host);

        
    } catch (error) {
        console.log("MONGODB Connection FAILED: ", error);
        process.exit(1);
    }
}