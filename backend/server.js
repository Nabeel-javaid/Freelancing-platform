import express from 'express';
import backendRouter from './routes/backendRouter.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
config();


const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())

mongoose.connect(process.env.ALTAS_URL).then(()=>{
    console.log("DB Connected !!!");
}).catch(err=>{
    console.log(err);
})

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`App Listening on port ${process.env.PORT}`)
})


app.use("/service",backendRouter);