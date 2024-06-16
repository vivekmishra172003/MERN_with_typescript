import mongoose, { Schema,Document,Model } from "mongoose";

interface IURL extends Document {
    shortId:string;
    redirectURL:string;
    visitHistory:{timeStamp:number}[];
}

const urlSchema:Schema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[
        {
            timeStamp:{type:Number}
        }
    ]
},{
    timestamps:true
})
const URL:Model<IURL> = mongoose.model<IURL>('url',urlSchema);
export default URL;