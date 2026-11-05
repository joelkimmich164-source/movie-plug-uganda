// Deploy this only on a server with HTTPS and environment variables.
// Required: OWNER_EMAIL, OWNER_PASSWORD_HASH, JWT_SECRET
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const app=express();
app.use(helmet());app.use(express.json());app.use(rateLimit({windowMs:15*60*1000,max:20}));
const must=(v,n)=>{if(!v)throw new Error(`Missing ${n}`)};
["OWNER_EMAIL","OWNER_PASSWORD_HASH","JWT_SECRET"].forEach(k=>must(process.env[k],k));
app.get("/health",(req,res)=>res.status(200).json({status:"ok"}));
app.post("/api/admin/login",async(req,res)=>{const {email,password}=req.body||{};const valid=email===process.env.OWNER_EMAIL&&await bcrypt.compare(String(password||""),process.env.OWNER_PASSWORD_HASH);if(!valid)return res.status(401).json({error:"Invalid sign-in"});res.json({token:jwt.sign({role:"owner"},process.env.JWT_SECRET,{expiresIn:"2h"})})});
const owner=(req,res,next)=>{try{req.owner=jwt.verify((req.headers.authorization||"").replace("Bearer ",""),process.env.JWT_SECRET);if(req.owner.role!=="owner")throw 0;next()}catch{return res.status(401).json({error:"Owner sign-in required"})}};
app.get("/api/admin/catalogue",owner,(req,res)=>res.json({message:"Connect this endpoint to your licensed private video storage before launch."}));
app.listen(process.env.PORT||3000);
