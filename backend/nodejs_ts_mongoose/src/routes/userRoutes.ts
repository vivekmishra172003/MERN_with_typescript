import { Router } from "express";
import {getUser,createUser} from '../controllers/userController'

const router:Router = Router();
router.get('/',getUser)
.post('/',createUser);

export default router;