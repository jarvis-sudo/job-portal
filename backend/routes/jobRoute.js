import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController";
import router from "./userRoute";

router = express.Router();

router.route("/postJob").post(postJob);
router.route("/getAllJobs").post(getAllJobs);
router.route("/getJobById").post(getJobById);
router.route("/getAdminJobs").post(getAdminJobs);

export default router;