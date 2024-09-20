// src/index.ts
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import prisma from './prismaClient';
import { error } from 'console';

const app:Application = express();
const PORT:number = 3000;

//middleware 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'../views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'../public')));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});
app.post('/create',async (req:Request,res:Response)=>{
  const {username,email,password,age}=req.body;
    if(!username || !email || !password || !age){
      return res.status(400).json({error:"All fields are required"});
    }
    try{
      const newUser = await prisma.user.create({
        data:{
          username,
          email,
          password,
          age:parseInt(age,10)
        }
      });
      res.status(201).json({message:"User Created Successfully",newUser});
    }catch(error){
      console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
