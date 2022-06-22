import express from "express";
import { login, register } from "../controller/authController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/checkAuth",verifyToken,(req,res,next)=>{
    res.send("You are authenticated");
});
router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
    res.send("You are logged in");
});


export default router;