import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("mongodb connected");
    }catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }else{
            console.log("An unknown error  occurred");
        }
        process.exit(1);
    }
};

export default connectDB;