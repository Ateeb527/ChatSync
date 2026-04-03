import mongoose from "mongoose";

 const connectDB = async () => {
  try {
    console.log("Trying to connect DB..."); 
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("DB ERROR:", error);
  }
};
//console.log("URI:", process.env.MONGO_URI);

export default connectDB;
