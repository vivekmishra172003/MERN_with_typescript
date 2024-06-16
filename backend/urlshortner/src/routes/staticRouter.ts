import express, { Router,Request,Response }  from "express";
import URL from "../models/url";
const router:Router = express.Router();

router
.get('/',async (req:Request,res:Response)=>{
    const allurls = await URL.find({})
    return res.render("home",{
        urls:allurls
    });
})
.get('/signup',(req:Request,res:Response)=>{
    return res.render("signup");
})
.get('/login',(req:Request,res:Response)=>{
    return res.render("login");
})

export default router;