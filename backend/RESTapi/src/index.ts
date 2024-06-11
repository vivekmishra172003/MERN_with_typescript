import express, { Application ,Request,Response} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { error } from 'console';
dotenv.config();
import connectMongoDb  from './connection'
import userRouter from './routes/user'
const port:number =Number(process.env.PORT)||3000;
connectMongoDb(process.env.MONGO_URI!);
const app:Application = express();



app.use(express.urlencoded({extended:false}));

//connect mongoose





app.use('/user',userRouter)

app.listen(port,()=>{console.log(`Server connected at port ${port}`)})
