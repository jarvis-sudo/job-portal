import jwt  from "jsonwebtoken";

const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token;
console.log(token);
        if(!token){
            return res.status(401).json({
                message : "User not Authenticated",
                success : false
            })
        }

        const decode =  jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message : "Invalid token",
                success : false
        })
    }
    req.id = decode.userId;
    console.log(req.id)
    next();

    } catch (error) {
        console.error(error);
     /*   return res.status(500).json({
            message : "Internal server error",
            success : false
        }) */
    }
}

export default isAuth;