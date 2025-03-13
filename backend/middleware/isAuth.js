import jwt  from "jsonwebtoken";

const isAuth = async (req,res,next) => {
  //  console.log("isAuthhhhhh");
    try {
        const token = req.cookies.token;
       // console.log("token" ,token);
        if(!token){
            return res.status(401).json({
                message : "User not Authenticated",
                success : false
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY);
       // console.error("Decoded",decode)
        if(!decode){
            return res.status(401).json({
                message : "Invalid token",
                success : false
        })
    }
    req.id = decode.userId;
   // console.log("mid",req.id)
    next();

    } catch (error) {
        console.error(error);

        if(error.name === "TokenExpiredError") {
            return res.status(401).json({
                message : "TOken expired, please login again",
                success : false
            })
        }

        return res.status(401).json({
            message : "Invalid Token",
            success : false
        })
        
    }
}

export default isAuth;