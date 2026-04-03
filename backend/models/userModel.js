import mongoose from "mongoose";
const userSchema = new mongoose.Schema({// Define the schema for the User model
    fullName: {//
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    gender:{
        type: String,
        enum: ["male", "female", "other"],
        required: true
    }
},{timestamps:true});//time pta chl skega ki user kab create hua aur kab update hua

const User = mongoose.model("User", userSchema);// Create the User model using the defined schema two User used one is model name and other is schema name
export default User;