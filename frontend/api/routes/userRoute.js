import express from "express";
import { register, login , logout , updateProfile } from "../controllers/userController.js";
import { singleUpload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuth,singleUpload,updateProfile);

export default router;