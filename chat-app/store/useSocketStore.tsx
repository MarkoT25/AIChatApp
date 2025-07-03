import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; //BACKEND URL

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set) => {
  let socket: Socket | null = null;

  return {
    socket: null,
    onlineUsers: [],

    connectSocket: (userId: string) => {
      if (!socket) {
        socket = io(SOCKET_URL, {
          query: { userId },
          transports: ["websocket"],
        });

        console.log("Connected to socket with user id:", userId);

        socket.on("getOnlineUsers", (users: string[]) => {
          set({ onlineUsers: users });
        });

        set({ socket });
      }
    },

    disconnectSocket: () => {
      if (socket) {
        socket.disconnect();
        set({ socket: null, onlineUsers: [] });
        console.log("Disconnected from socket");
      }
    },
  };
});
