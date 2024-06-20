import mongoose, { Schema } from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
// The '!' symbol is used here to tell TypeScript that process.env.MONGO_URI will definitely be defined
mongoose.connect(process.env.MONGO_URI!);
const userSchema:Schema = new  mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
})
export default  mongoose.model("user",userSchema);