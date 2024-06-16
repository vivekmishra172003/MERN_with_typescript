// import User from '../models/user';
import {getUser} from '../service/auth'
import {Request,Response,NextFunction} from 'express'
async function restrictToLoggedinUserOnly(req:Request,res:Response,next:NextFunction) {
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect("/login");
    const user = await getUser(userUid);
    if(!userUid) return res.redirect("/login");
    req.user:?User = user;
    next();
}
export default restrictToLoggedinUserOnly;