import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded);
app.use('/api/users',userRoutes);

export default app;