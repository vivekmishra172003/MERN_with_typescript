import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import {json,urlencoded} from 'body-parser'

dotenv.config();

const app:Application = express();

app.use(cors());
app.use(json()); // Use body-parser to parse JSON requests
app.use(urlencoded({ extended: true })); 
app.use('/api/users',userRoutes);

export default app;