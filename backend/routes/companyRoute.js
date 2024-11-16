
import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCompanyById, registerCompany, getCompany, updateCompany } from "../controllers/companyController.js";



const router = express.Router();

router.route("/register").post(isAuth,registerCompany);
router.route("/get").get(isAuth,getCompany);
router.route("/get/:id").get(isAuth,getCompanyById);
router.route("/update/:id").put(isAuth,updateCompany);

export default router;