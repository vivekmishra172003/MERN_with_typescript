import express, { Router } from 'express'
import handleGenerateNewShortURL from '../controller/url'
const router:Router = express.Router();


router
.post('/',handleGenerateNewShortURL);

export default router;