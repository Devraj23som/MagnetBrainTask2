import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import  dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import Stripe from "stripe";
var stripe=new Stripe("sk_test_51QVo4xKPrNKNP5sGowE4fnE3KamoKz35EvU14l5mjc6kJATVD8veIQBoOkrNbzaEnxJR56NTLesfMOMy4pVDBVGM00ULaMQDeb")
// import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express()
dotenv.config()
connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('server is listening...')
  })
  app.use('/api/users', userRoutes) 
  const PORT = 5000 || process.env.PORT

app.listen(PORT, ()=>{
  console.log(`server is running on port http://localhost:${PORT}`);
})