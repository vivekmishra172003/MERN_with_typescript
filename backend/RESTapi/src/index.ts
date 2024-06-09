import express, { Application ,Request,Response} from 'express'
import dotenv from 'dotenv'
import fs from 'fs';
import mongoose, { Model, Schema } from 'mongoose';
dotenv.config();
const port:number =Number(process.env.PORT)||3000;
const app:Application = express();

app.use(express.urlencoded({extended:false}));

//connect mongoose
mongoose.connect(process.env.MONGO_URI!)
.then(() => console.log('MongoDB connected'))
.catch((err:any) => console.error('Failed to connect to MongoDB', err))

interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    jobTitle?: string;
    gender?: string;
}

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
// model
const User:Model<IUser> = mongoose.model<IUser>('user',userSchema);

app.post("/api/users",async (req:Request,res:Response)=>{
    const body:any = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ){
        return res.status(400).json({msg:"All fields are req.."})
    }
    const result = await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle
    },{
        timestamps:true,
    });
    console.log("result");
    return res.status(201).json({msg:"sucess"});
})
.get("/users",async (req:Request,res:Response)=>{
    const allDbUsers = await User.find({});
    const html =`
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})







app.listen(port,()=>{console.log(`Server connected at port ${port}`)})
