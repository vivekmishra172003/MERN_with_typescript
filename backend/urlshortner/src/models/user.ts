import mongoose,{Document, Model, Schema} from "mongoose";
interface IUSER extends Document{
    name:string,
    email:string,
    passwrod:string,
}

const  userSchema:Schema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
})

const User:Model<IUSER> = mongoose.model<IUSER>('user',userSchema);
export default User;