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

export default handleGenerateNewShortURL;