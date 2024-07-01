import { Router } from "express";
import { getUsers,createUser } from "../controllers/userController";
const router:Router = Router();
router
.get('/',getUsers)
.post('/',createUser);

export default router;