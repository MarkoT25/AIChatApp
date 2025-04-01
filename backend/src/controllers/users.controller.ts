import express from "express";
import User from "../models/user.model";
import { verifyToken } from "../utils/token";


export const listUsers = async (req: express.Request, res: express.Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = verifyToken(token);
        const loggedUserId = (decoded as any).userId;

        const users = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
        res.status(200).json({ users });
    } catch (error: any) {
        res.status(500).json({ message: `Error while fetching users: ${error.message}` });
    }
};