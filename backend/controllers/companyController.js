import { Company } from "../models/companyModel.js";

export const registerCompany = async (req,res) => {
    console.log(req.body); // Check the incoming request body
    try {
        const { companyName } = req.body;
        if (!req.userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        if(!companyName) {
            return res.status(400).json({
                message : "Company name is required",
                success : false
            })
        }
        let company = await Company.findOne({name : companyName});
        if(company) {
            return res.status(400).json({
                message : "You can't register same company",
                success : false
            })

        }
        
        company = await Company.create({
            name : companyName,
            userId : req.userId
        })

        return res.status(201).json({
            message : "company registered successfully",
            company,
            success : true
        })

    } catch (error) {
    
        console.log(error);
        
    }
}

export const getCompany = async (req,res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message : "Companies cannot found",
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

export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByid(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            
            success: true
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req,res) => {
    try {
        const { name , description , website , location } = req.body;

        const updateData = { name , description , website , loction};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData);

        if(!company){
            return res.status(400).json({
                message : "company not found",
                success : false
            })
        }

        return res.status(200).json({
            message : "company info updted",
            success : false 
        })

    } catch (error) {
        console.log(error);
    }
}