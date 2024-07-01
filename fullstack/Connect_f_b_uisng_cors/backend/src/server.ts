import mongoose from "mongoose";
import app from "./app";
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongo_connection_string';

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("MongoDb is connected now");
    app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`));
})
.catch(err=>console.error(err));