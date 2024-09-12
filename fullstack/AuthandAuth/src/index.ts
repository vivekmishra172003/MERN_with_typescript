import express, { Application, Request,Response } from "express";
import cookieParser  from "cookie-parser";
import bcrypt from 'bcrypt'; 
const app:Application = express();
const PORT:number=3000;

//middleware
app.use(cookieParser());

//routes



app.get('/',(req:Request,res:Response)=>{
    res.cookie("name","Vivek")
    res.send("Hello setup is done");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });