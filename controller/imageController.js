import Images from "../model/Images.js"

export const findImage=async(req,res,next)=>{
    try{
        const images=await Images.find({"user_id": req.params.id});
        res.status(200).json(images);
    } catch(err){
        next(err);
    }
}
export const deleteImage=async(req,res,next)=>{
    try{
        const images=await Images.findByIdAndDelete({"_id": req.params.id});
        res.status(200).json("image deleted");
    } catch(err){
        next(err);
    }
}