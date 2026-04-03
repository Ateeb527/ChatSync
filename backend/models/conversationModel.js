import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({// 
    participants:[//bcoz we want to know who are the participars in the conversation
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    message:[{//bcoz we want to know which messages belongs to which conversation
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;