import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config({});
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js"
import companyRoute from "./routes/companyRoute.js"

const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
 app.use(cookieParser());
const corsOptions = {
    origin : "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company" , companyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running at port : ${PORT}`)
    
})