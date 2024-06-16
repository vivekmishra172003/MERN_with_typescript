// userRouter.ts

import express, { Router } from 'express';
import { handleUserSignup, handleUserLogin } from '../controller/user';

const router: Router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

export default router;
