import shortid from "shortid";
import URL from "../models/url";
import { Request,Response } from "express";

async function handleGenerateNewShortURL(req:Request,res:Response) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortID = shortid.generate();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    })
    return res.json({id:shortID})
}

async function handleOpenURL(req:Request,res:Response){
    const shortId:string = req.params.shortId;
    const entry =  await URL.findOneAndUpdate(
        {shortId,},
        {$push:{visitHistory:{timestamp:Date.now()},}},
    // {new:true}
);

    if(!entry){
        return res.status(404).json({error:"short URL not found"});
    }
    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req:Request,res:Response) {
    const shortId:string = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result?.visitHistory.length,
        analytics:result?.visitHistory
    });
}

export {handleGenerateNewShortURL,handleOpenURL,handleGetAnalytics} ;