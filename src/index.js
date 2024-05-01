// require('dotenv').config({ path: './env' });
import 'dotenv/config';
import { connectDB } from "./db/index.js";
import { app } from './app.js';

connectDB()
    .then(() => {

        app.on("error", (err) => {
            console.log("Error: ", err);
            throw err;
        })

        app.listen(process.env.PORT || 8081, () => {
            console.log(`Server listening on ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB Connection Failed: ", err);
})




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