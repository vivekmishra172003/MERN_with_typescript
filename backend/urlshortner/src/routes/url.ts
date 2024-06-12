import express, { Router,Request,Response } from 'express'
import {handleGenerateNewShortURL,handleGetAnalytics,handleOpenURL} from '../controller/url'
const router:Router = express.Router();


router
.post('/',handleGenerateNewShortURL)
.get('/:shortId',handleOpenURL )
.get('/analytics/:shortId',handleGetAnalytics)
export default router;