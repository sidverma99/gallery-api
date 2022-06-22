import express from "express";
import { deleteImage, findImage } from "../controller/imageController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

router.get("/allImage/:id", findImage);
router.get("/delete/:id",deleteImage);

export default router;