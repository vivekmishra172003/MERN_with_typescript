import express, { Application } from 'express'
import connectDB  from './config/db'
import userRoutes  from './routes/userRoutes'
import dotenv from 'dotenv'
dotenv.config();
const app:Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/api/users',userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });