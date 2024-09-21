import express, { Application, Request,Response } from "express";
import cookieParser  from "cookie-parser";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

const app:Application = express();
const PORT:number=3000;

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//routes

//jwt
app.get("/j",(req:Request,res:Response)=>{
    let token =jwt.sign({email:"harsh@example.com"},"secrect");
    res.cookie("token",token);
    // console.log(token);
    // res.end();
})
app.get("/read",(req:Request,res:Response)=>{
    let data = jwt.verify(req.cookies.token,"secrect");
    console.log(data);
})

//bcrupt
app.get("/auth",(req:Request,res:Response)=>{
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash("myPlaintextPassword",salt,(err,hash)=>{
            console.log(hash);
        })
    })
})
app.get("/enc",(req:Request,res:Response)=>{
    bcrypt.compare("myPlaintextPassword","$2b$10$WDwSE74HoF..sIb8HwCKw.Tfvix9B5UZO.rf0laonnj/5KzzhOVRC",(err,result)=>{
        console.log(result);
    })
})


app.get('/',(req:Request,res:Response)=>{
    res.cookie("name","Vivek")
    res.send("Hello setup is done");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });