import User from "../models/user"
import { Request,Response } from "express";

async function  handleUserSignup(req:Request,res:Response) {
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("home")
}

export default handleUserSignup