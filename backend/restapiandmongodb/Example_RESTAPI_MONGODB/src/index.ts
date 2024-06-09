import dotenv from 'dotenv'
import express from 'express'
dotenv.config();

const PORT = process.env.PORT;
const app = express();


app.listen(PORT,()=>{console.log(`Server started at port ${PORT}`)})