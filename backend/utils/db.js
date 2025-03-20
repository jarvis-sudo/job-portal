import mongoose from "mongoose";


const connectDB = async () => {
    try {
     //   console.log("Mongo URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully")
    } catch (error) {
        console.error("Error , connecting to mongo db!",error.message);
        process.exit(1);
    }
}

export default connectDB;