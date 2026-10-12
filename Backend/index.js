import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import {rateLimit} from "express-rate-limit"
import { connectDB } from "./config/db.js"
import dns from "dns"
import authRoutes from "./routes/authRoutes.js"

dns.setServers(["1.1.1.1", "8.8.8.8"]);


dotenv.config();

const app = express();

const PORT = process.env.PORT
app.use(helmet());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

const authLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:20,
    standardHeaders:'draft-7',
    legacyHeaders:false
})
app.get('/api/health',(req,res)=>res.json({status:'OK'}));
app.use('/api/auth/register',authLimiter);
app.use('/api/auth/login',authLimiter);
app.use('/api/auth',authRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    connectDB();
})