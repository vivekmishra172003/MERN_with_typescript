import express, { Application } from 'express'
import dotenv from 'dotenv'
dotenv.config();
const port:number =Number(process.env.PORT)||3000;
const app:Application = express();

app.listen(port,()=>{console.log(`Serer connnect at port ${port}`)});