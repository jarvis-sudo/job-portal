import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController";

const router = express.Router();

router.route("/applyJob").post(applyJob);
router.route("/getAppliedJobs").post(getAppliedJobs);
router.route("/getApplicants").post(getApplicants);
router.route("/updateStatus").post(updateStatus);

export default router;