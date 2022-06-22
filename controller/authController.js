import bcrypt, { hash } from "bcrypt"
import Credential from "../model/Credential.js";
import jwt from "jsonwebtoken"

export  const register=async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash1 = bcrypt.hashSync(req.body.password , salt); 
        const hash2=bcrypt.hashSync(req.body.email , salt);
        const newCredential=new Credential({
            username: req.body.username,
            email: hash2,
            password: hash1,
        });
        await newCredential.save();
        res.status(200).send("User has been created")
    }catch(err){
        next(err);
    }
}

export const login=async (req,res,next)=>{
    try{
        const credential=await Credential.findOne({username:req.body.username});
        if(!credential) return next(createError(404,"User Not found"));
        const isPassword=await bcrypt.compare(req.body.password, credential.password);
        if(!isPassword) return next(createError(400,"Wrong Password or Username"));

        const token=jwt.sign({
            id: credential._id
        },process.env.JWT);
        const {password, ...otherDetails}=credential._doc;
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({...otherDetails});
    }catch(err){
        next(err);
    }
}
