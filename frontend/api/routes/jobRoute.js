import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.route("/post").post(isAuth,postJob);
router.route("/get").get(isAuth,getAllJobs);
router.route("/get/:id").get(isAuth,getJobById);
router.route("/getadminjobs").get(isAuth,getAdminJobs);

export default router;