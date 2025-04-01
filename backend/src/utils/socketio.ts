// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//     },
// });

// export const getRecieverSocketId = (recieverId: string) => {
//     return userSocketMap[recieverId];
// }

// const userSocketMap: Record<string, string> = {};
// const userRooms: Record<string, string> = {};

// io.on("connection", (socket) => {
//     // console.log(`User connected: ${socket.id}`);

//     const userId = socket.handshake.query.userId as string;
//     if (userId) {
//         userSocketMap[userId] = socket.id;
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     }

//     // User joins a chat room
//     socket.on("joinChat", ({ senderId, recieverId }) => {
//         const roomId = [senderId, recieverId].sort().join("-");
//         socket.join(roomId);
//         userRooms[socket.id] = roomId;
//         // console.log(`User ${senderId} joined room ${roomId}`);
//     });

//     // Handle user disconnect
//     socket.on("disconnect", () => {
//         // console.log(`User disconnected: ${socket.id}`);
//         delete userSocketMap[userId];

//         const roomId = userRooms[socket.id];
//         if (roomId) {
//             socket.leave(roomId);
//             delete userRooms[socket.id];
//         }

//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// });



// export { io, server, app };


import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export const getRecieverSocketId = (recieverId: string) => {
  return userSocketMap[recieverId];
};

const userSocketMap: Record<string, string> = {};
const userRooms: Record<string, string> = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // User joins a chat room
  socket.on("joinChat", ({ senderId, recieverId }) => {
    const newRoomId = [senderId, recieverId].sort().join("-");

    // Leave the current room if the user is already in one
    if (userRooms[socket.id] && userRooms[socket.id] !== newRoomId) {
      socket.leave(userRooms[socket.id]);
    }

    // Join the new room
    socket.join(newRoomId);
    userRooms[socket.id] = newRoomId;

    console.log(`User ${senderId} joined room ${newRoomId}`);
  });

  // Handle leaving the chat room
  socket.on("leaveChat", () => {
    const roomId = userRooms[socket.id];
    if (roomId) {
      socket.leave(roomId);
      delete userRooms[socket.id];
      console.log(`User ${socket.id} left room ${roomId}`);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[userId];

    const roomId = userRooms[socket.id];
    if (roomId) {
      socket.leave(roomId);
      delete userRooms[socket.id];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };



