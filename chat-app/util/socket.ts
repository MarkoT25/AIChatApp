import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      query: { userId }, // Send user ID to the backend
      transports: ["websocket"],
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
