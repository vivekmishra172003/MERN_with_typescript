import express, { Application,Request,Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
dotenv.config();

const port:number = Number(process.env.PORT!)||3000;
const app:Application = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views')); // This points to the views folder in the dist directory
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req:Request,res:Response)=>{
res.send("welcome");
})
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
});
