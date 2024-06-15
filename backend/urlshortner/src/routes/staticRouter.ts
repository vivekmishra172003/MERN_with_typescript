import express, { Router,Request,Response }  from "express";

const router:Router = express.Router();

router
.get('/',(req:Request,res:Response)=>{
    return res.render("home");
})

export default router;