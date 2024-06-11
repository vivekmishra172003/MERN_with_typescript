import mongoose from "mongoose";
import dotenv from 'dotenv';
import { url } from "inspector";
dotenv.config();
async function connectMongoDb(url:string) {
    return mongoose.connect(url)
}


export default connectMongoDb;