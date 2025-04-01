import express from "express";
import Message from "../models/message.model";
import { verifyToken } from "../utils/token";
import cloudinary from "../utils/cloudinary";
import { getRecieverSocketId, io } from "../utils/socketio";
const language = require('@google-cloud/language');
import mongoose from "mongoose";
import User from "../models/user.model";
// import User from "../models/user.model";

export const getMessages = async (req: express.Request, res: express.Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decode = verifyToken(token);

    const recieverId = (decode as any).userId;
    const { id: userToChatId } = req.params;

    try {

        const messages = await Message.find({
            $or: [
                { senderId: recieverId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: recieverId }
            ]
        }).sort({ createdAt: 1 });

        // console.log("messages", messages);

        res.status(200).json({ messages });

    } catch (error: any) {
        res.status(500).json({ message: `Error while fetching messages: ${error.message}` });
    }
}

export const sendMessage = async (req: express.Request, res: express.Response) => {
    const languageClient = new language.LanguageServiceClient();
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decode = verifyToken(token);
        const senderId = (decode as any).userId;
        const { id: recieverId } = req.params;
        const { text, image } = req.body;

        let imageUrl: string | null = null;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        console.log("Image url: ", imageUrl);
        let textMessage: string | null = null;
        if (text !== "") {
            textMessage = text;
        }

        //Google sentiment analysis
        let sentimentScore: number | null = null;

        if (text && text.trim() !== "") {
            textMessage = text;

            // Perform sentiment analysis
            const document = {
                content: text,
                type: "PLAIN_TEXT",
            };

            const [result] = await languageClient.analyzeSentiment({ document });
            const sentiment = result.documentSentiment;
            sentimentScore = sentiment ? sentiment.score : null;
            console.log("Sentiment score: ", sentimentScore);
        }

        const newMessage = new Message({
            senderId: senderId,
            recieverId: recieverId,
            text: textMessage,
            image: imageUrl,
            sentimentScore: sentimentScore,
        });

        console.log("New message: ", newMessage)
        await newMessage.save();

        const roomId = [senderId, recieverId].sort().join("-");
        // console.log(`Sending message to room: ${roomId}`);

        // Emit message only to the room
        io.to(roomId).emit("newMessage", newMessage);

        res.status(201).json({ message: "Message sent" });

    } catch (error: any) {
        res.status(500).json({ message: `Error while sending message: ${error.message}` });

    }


}

export const getLastMessages = async (req: express.Request, res: express.Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decode = verifyToken(token);
        const userId = new mongoose.Types.ObjectId((decode as any).userId);

        const lastMessages = await Message.aggregate([
            {
                $match: {
                    $or: [{ senderId: userId }, { recieverId: userId }]
                }
            },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: {
                        chatWith: {
                            $cond: [{ $eq: ["$senderId", userId] }, "$recieverId", "$senderId"]
                        }
                    },
                    lastMessage: { $first: "$$ROOT" }
                }
            },
            { $replaceRoot: { newRoot: { chatWith: "$_id.chatWith", lastMessage: "$lastMessage" } } }
        ]);

        const userIds = lastMessages.map(msg => msg.chatWith);
        const allUsers = await User.find({ _id: { $ne: userId } }).select('-password -__v').lean();

        const mergedData = allUsers.map(user => {
            const message = lastMessages.find(msg => msg.chatWith.toString() === user._id.toString());
            return { ...user, lastMessage: message ? message.lastMessage : null };
        });

        res.status(200).json(mergedData);
    } catch (error: any) {
        console.error("Error while fetching last messages:", error);
        res.status(500).json({ message: `Error retrieving last messages: ${error.message}` });
    }
};