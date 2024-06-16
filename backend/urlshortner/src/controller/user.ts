import User from "../models/user";
import { Request, Response } from "express";
import { setUser, getUser } from "../service/auth";
import { v4 as uuidv4 } from 'uuid';

async function handleUserSignup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
        await User.create({ name, email, password });
        return res.redirect("/");  // Changed from res.render("/") to res.redirect("/")
    } catch (error) {
        return res.status(500).json({ error: "Failed to create user" });
    }
}

async function handleUserLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password }).lean();  // Use lean() to get a plain JavaScript object
        if (!user) {
            return res.render("login", { error: "Invalid username or password" });
        }
        const sessionId: string = uuidv4();  // Ensured sessionId is typed as string
        setUser(sessionId, user);  // Corrected syntax error
        res.cookie("uid", sessionId);
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: "Login failed" });
    }
}

export { handleUserSignup, handleUserLogin };
