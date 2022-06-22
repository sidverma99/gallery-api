import Credential from "../model/Credential.js";
import Images from "../model/Images.js"

export const uploadFile=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const newImage=new Images({
            photo: req.file.filename,
            user_id: req.params.id,
            url: "http://localhost:8000/images/"+req.file.filename
        });
        await newImage.save();
        res.status(200).json("file has been uploaded");
    } catch(err){
        next(err);
    }
}