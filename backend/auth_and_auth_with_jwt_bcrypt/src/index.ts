import express, { Application,Request,Response } from 'express'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const port:number =Number(process.env.PORT)||3000;
const app:Application = express();

app.use(cookieParser());



// app.get("/",(req:Request,res:Response)=>{
//     res.cookie("name","harsh");
//     res.status(200).send("done");
// })
// app.get("/b",(req:Request,res:Response)=>{
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash("pololololo", salt, function(err, hash) {
//             // Store hash in your password DB.
//             console.log(salt);
//             console.log(hash);
//         });
//     });
// })

// app.get("/read",(req:Request,res:Response)=>{
//     console.log(req.cookies);
//     res.send("chak de fatte");
// })

// app.get("/",(req:Request,res:Response)=>{
//     bcrypt.compare("pololololo", "$2b$10$W5WcfuI0kycf5TsU/TQ0IeRGGUJ3z/CXxoGyX2.gXUh4r7pgwYVte", function(err, result) {
//         // result == true
//         console.log(result);
//     });
// })

app.get("/",(req:Request,res:Response)=>{
    let token = jwt.sign({email:"vivekmishra172003@gmail.com"},"secret");
    res.cookie("token",token);
    res.send("done");
    console.log(token);
})
app.get("/read",(req:Request,res:Response)=>{
    let data =  jwt.verify(req.cookies.token,"secret");
    console.log(data);
})

app.listen(port,()=>{console.log(`Serer connnect at port ${port}`)});