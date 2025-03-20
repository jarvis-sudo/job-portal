
import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import  JsonWebToken  from "jsonwebtoken";


export const register = async (req,res) => {
    try {
        const{ fullName , email , phoneNumber ,password ,role} = req.body;
        console.log(fullName , email , phoneNumber ,password ,role)

        if(!fullName || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                message : 'User already exists with email',
                success : false
            })
        }

        const hashedPass = await bcrypt.hash(password,10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password : hashedPass,
            role,
        })

        return res.status(201).json({
            message : "Account created successfully",
            success : true
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req,res) => {
    try {
        const { email , password , role} = req.body;

        if(!email ||  !password || !role){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }
        let user = await User.findOne({email});
        console.log("uder",user);
        if(!user){
            return res.status(400).json({
                message : "Incorrect email or Password",
                success : false
            })
        }

        const passMatch = await bcrypt.compare(password,user.password);

        if(!passMatch) {
            return res.status(400).json({
                message : "Incorrect email or password",
                success : false
            })
        }

        if(role!== user.role){
            return res.status(400).json({
                message : "Account doesn't exist with current role",
                success : false
            })
        }

        const tokenData = {
            userId : user._id
        }

        const token =  await JsonWebToken.sign(tokenData,process.env.SECRET_KEY, { expiresIn : '1d' })

        console.log(tokenData)
        
        user = { 
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        return res.status(200).cookie("token",token, {maxAge : 1*24*60*60*1000, httpsOnly : true, sameSite : 'strict' }).json({
            message : `welcome back ${user.fullName}`,
            user,
            token,
            success : true
        })

    } catch (error) {
        console.log('error in regidter:',error);
        return res.status(500).json({
            message:"Internal server error",
            success : false
        })
    }
}

export const logout = (req,res) => {
    try {
        return res
        .status(200)
        .clearCookie("token", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            path : "/"
        })
        .json({
            message : "Successfully logged out",
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong during logout!",
            success : false
        })
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullName , email , phoneNumber , bio , skills} = req.body;

        const userId = req.id;
    //    console.log("userid",userId)
        let user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                message : "User not foound",
                success : false
            })
        }
            
            if(fullName) user.fullName = fullName;
            if(email) user.email = email;
            if(phoneNumber) user.phoneNumber = phoneNumber;
            if(bio) user.profile.bio = bio;
            if(skills) user.profile.skills = skills;

        await user.save();

        user = {
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        return res.status(200).json({
            message : "profile Updated succesfully",
            success : true ,
            user
        })
        
    } catch (error) {
        console.log(error);        
    }
}