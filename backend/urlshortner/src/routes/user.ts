import express ,{Router} from 'express';
import handleUserSignup from '../controller/user';
const router:Router=express.Router(); 

router
.post('/',handleUserSignup)

export default router;