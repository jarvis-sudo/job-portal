import { Application} from "../models/applicationModel.js";



export const applyJob = async (req,res) => {
     try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message : "Job not found",
                success : false
            })
        }
        //if user already applied for the job

        const existingApplication = await Application.findOne({job : jobId,applicant :userId});

        if(existingApplication){
            return res.status(400).josn({
                message : "You already applied for this job",
                success : false
            })
        }
        //check if job exists

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
        }
        //create a new Application

        const newApplication = application.create({
            job : jobId,
            applicant : userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message : "job applied successfully",
            success :true
        })

     } catch (error) {
        console.log(error)
     }
}

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({});
        if(!application){
            return res.status(400).json({
                message : "No application",
                success : false
            })
        } 
        return res.status(200).json({
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = Job.findById(jobId).populate({

        })
        if(!job){
            return res.status(400).json({
                message : "job not found",
                success : false
            })
        }
        return res.status(200).json({
            success : true
        })

    } catch (error) {
        console.log(error)
    }
}

//update status

export const updateStatus = async (req,res) => {
     try {
        const { status } =req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message : "status is required",
                success : false
            })
        }

        const application = await Application.findOne({_id:applicationId});

        if(!application){
            return res.status(400).json({
                message : "application not found",
                success : false
            })
        }

        application.status = status.toLowerCase();
        application.save();

        return res.status(200).json({
            message : "status updated successfully",
            success : true
        })

     } catch (error) {
        console.log(error)
     }
}

