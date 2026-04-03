//“This middleware verifies the JWT token from cookies, ensures the user is authenticated, and attaches the userId to the request object for use in protected routes exammple badge club exampple to get other users except logged in user kaise niakli but how 
import jwt from "jsonwebtoken";
 const isAuthenticated= async (req,res,next)=>{
    try{
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;//req.user id ka matlab hai ki humne userId ko request object me attach kar diya to use in  protected routes  example to get other users except logged in user
        // verify token, attach userId, allow access to protected routes
        console.log("Decoded token:", decoded); // 
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"});
        }
        next();//next means if token is valid then it will call the next middleware or route handler otherwise it will return unauthorized error 

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};
export default isAuthenticated;
//Note:t jo db ka user tha uski id token main daaldi phir token cookie main save kr di, aur other users kaise nikali? to jab token verify karenge to usme se user id nikal ke request object me attach kar denge jisse hum protected routes me use kar sakte hai for example to get other users except logged in user.
