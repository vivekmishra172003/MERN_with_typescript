// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    if(err instanceof Error){
        res.status(500).json({ error: err.message });
    }else{
        res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const createUser = async (req:Request,res:Response)=>{
    try{
        const {name,email}= req.body;
        const newUser = new User({name,email});
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        if(err instanceof Error){
            res.status(500).json({ error: err.message });
        }else{
            res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
}
