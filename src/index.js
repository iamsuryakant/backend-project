// require('dotenv').config({ path: './env' });
import 'dotenv/config';
import { connectDB } from "./db/index.js";

connectDB()








/*

import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        app.on("error", (err) => {
            console.log("Error: ", err);
            throw err;
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })

    } catch (error) {
      console.error(error);
      throw error;
    }
})()

*/