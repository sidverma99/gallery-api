import express from "express";
import multer from "multer";
import { uploadFile } from "../controller/uploadController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router=express.Router();
const generateName=()=>{
    const a=Math.random()*(100000)+1;
    const b=a.toString();
    const name="images-"+b+"-"+Date.now()+".jpeg";
    return name;
}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },filename:(req,file,cb)=>{
        cb(null,generateName());
    },
});
const upload=multer({storage:storage});
router.post('/:id', upload.single("file"), uploadFile);

export default router;