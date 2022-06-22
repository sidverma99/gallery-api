import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import uploadRoute from "./routes/uploadRoute.js"
import imageRoute from "./routes/imageRoute.js"
import path from "path"

dotenv.config();
const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongo");
    } catch(err){
        console.log(err);
    }
}
const __dirname = path.resolve();
const app=express();
app.use("/images", express.static(path.join(__dirname,"/images")));

app.listen(process.env.PORT || 8000,()=>{
    connect();
    console.log("Connected to backend");
});
app.use(cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMsg=err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMsg,
        stack: err.stack,
    });
});

app.get("/",(req,res)=>{
    res.send("API Started")
})

app.use("/api/auth",authRoute);
app.use("/api/upload",uploadRoute);
app.use("/api/images", imageRoute);