

export const postJob = async (req,res) => {
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,compayId } = req.body;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !compayId){
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
            compayId : compayId,
            created_by : userId
        })

        return res.status(200).json({
            message : "New job created successfully",
            success : true
        })


    } catch (error) {
        console.log(error)
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {

        }



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

        returnres.status(200).json({
            success : true
        })


    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}