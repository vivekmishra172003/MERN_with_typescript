import mongoose, { Model, Schema } from "mongoose";
//Schema
const userSchema:Schema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:false,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        jobTitle:{
            type:String,
        },
        gender:{
            type:String,
        }
    }
)

interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    jobTitle?: string;
    gender?: string;
}


// model
const User:Model<IUser> = mongoose.model<IUser>('user',userSchema);

export default User;