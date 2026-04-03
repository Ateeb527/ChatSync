import mongoose from "mongoose";
const messaageSchema = new mongoose.Schema({// Define the schema for the Message model
    senderId:{//bcoz we want to know who is sending the message
        type: mongoose.Schema.Types.ObjectId,//referce coming from user model mongoose se schema se Types name se ObjectId aata hai
        ref: "User",
        required: true
    },
    recieverId:{//want to know who is receiving the message
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messageText:{
        type: String,
        required: true
    }
},{timestamps:true});

const Message = mongoose.model("Message", messaageSchema);
export default Message;