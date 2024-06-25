import { Request,Response } from "express";
import User,{IUser} from '../models/userModel';

export const getUser = async (req:Request,res:Response):Promise<void>=>{
try{
    const users = await User.find();
    res.status(200).json(users);
} catch(err){
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'An unknown error occurred' });
    }
}
}

export const createUser = async (req:Request,res:Response):Promise<void>=>{
    const {name,email,password} = req.body;
    try{
        const newUser:IUser = new User({
            name,
            email,
            password
        });
        const createdUser = await newUser.save();
        res.status(201).json(createdUser);

    }catch(err){
        if(err instanceof Error){
            console.log(`Error is ${err}`);
        }
        else{
            console.log("some unknown error has occured");
        }
    }
}