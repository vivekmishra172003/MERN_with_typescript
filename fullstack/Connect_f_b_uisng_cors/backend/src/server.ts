import mongoose from "mongoose";
import cors from 'cors';
import app from "./app";
import {json,urlencoded} from 'body-parser'
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;
app.use(cors());
app.use(json()); // Use body-parser to parse JSON requests
app.use(urlencoded({ extended: true })); 

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("MongoDb is connected now");
    app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`));
})
.catch(err=>console.error(err));