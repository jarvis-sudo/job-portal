import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config({});
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js"
import companyRoute from "./routes/companyRoute.js"
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js"

const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
 app.use(cookieParser());
const corsOptions = {
    origin : "https://frontend-pi-jet-24.vercel.app",
    credentials:true
}
app.use(cors(corsOptions))

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company" , companyRoute);
app.use("/api/v1/job" , jobRoute);
app.use("/api/v1/application" , applicationRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running at port : ${PORT}`)
    
})