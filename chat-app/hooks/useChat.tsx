import { MessageType } from "@/interfaces/types";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketMessageType extends MessageType {
  roomId: string;
}

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL; 

const useChat = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, { query: { userId } });
    setSocket(newSocket);

    console.log("User id:", userId);

    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("Online users:", userIds);
      setOnlineUsers(userIds);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return { onlineUsers, socket };
};

export default useChat;

