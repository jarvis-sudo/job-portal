import { Job } from "../models/jobModel.js"

export const postJob = async (req,res) => {
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId } = req.body;
        const userId = req.id;

        console.log("userID:",userId)
        console.log("c_id:",companyId)
        console.log(req.body);
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message : "Something is mssin",
                success : false
            })
        }
        
        const job = await Job.create({
            title,
            description,
            requirements,
            salary : Number(salary),
            location,
            jobType,
            experienceLevel : experience,
            position,
            company : companyId,
            createdBy : userId
        })

        return res.status(200).json({
            message : "New job created successfully",
            job,
            success : true
        })


    } catch (error) {
        console.log(error);
        
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                { title : { $regex : keyword, $options : "i"}},
                { description : { $regex : keyword, $options : "i"}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path : "company"
        }).sort({ createdAt : -1});

        if(!jobs) {
            return res.status(404).json({
                message : 'Jobs not found',
                success : false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })



    } catch (error) {
        console.log(error)
    }
}

export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if(!job){
            return res.status(404).json({
                message : "jobs not found",
                success : false
            })

        }

        return res.status(200).json({
            success : true,
            job
        })


    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy : adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs) {
            return res.status(404).json({
                message: "jobs not found",
                success : false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}