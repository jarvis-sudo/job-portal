import mongoose from "mongoose";


const connectDB = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Wait 10s before timeout
            socketTimeoutMS: 45000, // Keep sockets open for 45s
        });
        console.log("mongodb connected successfully")
    } catch (error) {
        console.error("Error , connecting to mongo db!",error.message);
        process.exit(1);
    }
}

export default connectDB;