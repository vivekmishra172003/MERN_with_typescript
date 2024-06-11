import  express,{Request,Response}  from "express";
import User from "../controller/user";


const router = express.Router();
router.post("/",async (req:Request,res:Response)=>{
    const body:any = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ){
        return res.status(400).json({msg:"All fields are req.."})
    }
    const result = await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle
    },{
        timestamps:true,
    });
    console.log("result");
    return res.status(201).json({msg:"sucess"});
})
.get("/", async (req:Request,res:Response)=>{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})
router.route("/:id")
.get( async (req:Request,res:Response)=>{
    const user = await  User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
 })
 .delete(async (req:Request,res:Response)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"Sucessfuly deleted"})
 });

export default router;