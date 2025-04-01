"use client";

import { useSocketStore } from "@/store/useSocketStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserChatbox from "../Chat/UserChatbox";
import { useQuery } from "@tanstack/react-query";
import { authUser } from "@/lib/authFetching";
import { fetchMessages } from "@/lib/messageFetching";
import { MessageType } from "@/interfaces/types";

const UserChatPageContainer = () => {
  const params = useParams();
  const recieverId = params.id as string;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { socket } = useSocketStore();

  // Fetch logged-in user
  const { data: loggedUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });

  const userId = loggedUser?._id;

  useEffect(() => {
    if (userId && recieverId && socket) {
      // Leave the previous room
      socket.emit("leaveChat");
  
      // Join the new room
      console.log(`Joining room: senderId=${userId}, recieverId=${recieverId}`);
      socket.emit("joinChat", { senderId: userId, recieverId });
    }
  }, [userId, recieverId, socket]);
  

  // Fetch stored messages
  const { data: storedMessages, isLoading: areStoredMessagesLoading } =
    useQuery({
      queryKey: ["messages", recieverId],
      queryFn: () => fetchMessages(recieverId),
      enabled: Boolean(recieverId),
    });

  // Combine stored messages with state
  useEffect(() => {
    if (storedMessages) {
      setMessages((prevMessages) => {
        const combinedMessages = [...prevMessages, ...storedMessages];
        const uniqueMessages = Array.from(
          new Set(combinedMessages.map((msg) => msg._id))
        ).map((id) => combinedMessages.find((msg) => msg._id === id));
        return uniqueMessages as MessageType[];
      });
    }
  }, [storedMessages]);

  // Handle new incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: MessageType) => {
      console.log("New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="w-full">
      <UserChatbox
        messages={messages}
        areStoredMessagesLoading={areStoredMessagesLoading}
      />
    </div>
  );
};

export default UserChatPageContainer;
