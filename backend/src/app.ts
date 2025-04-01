import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/users.route";
import cors from "cors";
import { connectDB } from "./utils/db";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route";
import { app, server } from "./utils/socketio";

dotenv.config();

const PORT = process.env.PORT || 8000;

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});