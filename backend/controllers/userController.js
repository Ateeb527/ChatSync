import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
//userController here means that we will write all the functions related to user like register, login, get user details etc.
export const register = async (req, res) => {
    try{
        const {fullName, username, password,confirmPassword, gender,} = req.body;//we will get the data from the request body profile picture is optional 
        if(!fullName || !username || !password || !confirmPassword || !gender)
            return res.status(400).json({message:"All fields are required"});

        if(password !== confirmPassword)
            return res.status(400).json({message:"Passwords do not match"});

        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:"User already exists"});
                }
        //hash the password before saving to database we will use bcryptjs for that for security purpose
        const hashpassword=await bcrypt.hash(password,10);//10 is min round to gen hash

 const ProfilePhoto = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
//const femaleProfilePhoto = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
        
       const newUser = await User.create({
            fullName,
            username,
            password: hashpassword,
            profilePhoto: ProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: newUser
        });

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }           
};

export const login= async (req,res)=>{
    try{
        const{username,password}=req.body;
        if(!username || !password)            return res.status(400).json({message:"All fields are required"});
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"User does not exist"
            ,success:false});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);//bcrypt it to compare user entered password with hashed password in database and it will return true or false
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false});
            
        }
        const tokendata={
            userId:user._id,
        }
        const token=await jwt.sign(tokendata,process.env.JWT_SECRET,{expiresIn:"1d"});//jwt secret is a secret key that we will use to sign the token and it should be kept secret and expires in 1 days
        return res.status(200).cookie("token", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }).json({//cookie is actually used to store token in browser and it will be sent to server with every request and httpOnly is used to prevent cross site scripting attacks
            message:"Login successful",
            success:true,
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePhoto:user.profilePhoto,

        });

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};

export const logout= async (req,res)=>{
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logout successful"
        });
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};
export const otherUsers= async (req,res)=>{
    try{
        const otherUsers=await User.find({_id:{$ne:req.userId}}).select("-password");//we will get all users except the logged in user and we will not select password field
        return res.status(200).json({otherUsers});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};