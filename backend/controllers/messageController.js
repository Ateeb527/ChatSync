import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../index.js"; // ✅ import

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const recieverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, recieverId],
            });
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            messageText: message,
        });

        if (newMessage) {
            gotConversation.message.push(newMessage._id);
            await gotConversation.save();
        }

        // ✅ Send real time message via Socket.io
        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({
            success: true,
            newMessage: newMessage,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const recieverId = req.params.id;
        const senderId = req.userId;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] },
        }).populate("message");

        return res.status(200).json({
            success: true,
            messages: conversation?.message || [],
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};