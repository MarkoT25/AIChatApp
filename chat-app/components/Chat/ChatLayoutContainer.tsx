"use client";

import React, { useEffect} from "react";
import ChatMessagesSection from "./ChatMessagesSection";
import useChat from "@/hooks/useChat";
import { useQuery } from "@tanstack/react-query";
import { authUser } from "@/lib/authFetching";
import LoadingSpinner from "../LoadingSpinner";
import { useSocketStore } from "@/store/useSocketStore";
import { fetchUsersWithLastMessages } from "@/lib/messageFetching";

interface ChatLayoutContainerProps {
  children: React.ReactNode;
}

const ChatLayoutContainer = ({ children }: ChatLayoutContainerProps) => {
  const { data: loggedUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });
  const userId = loggedUser?._id;
  const { onlineUsers } = useChat(loggedUser._id || "");
  const { connectSocket, disconnectSocket } = useSocketStore();

  const { data: users, isLoading: areUsersLoading } = useQuery({
    queryKey: ["mergedUsers"],
    queryFn: () => fetchUsersWithLastMessages(),
  });


  // Connect to socket when userId is available (when user is logged in)
  useEffect(() => {
    if (userId) {
      connectSocket(userId);
    }
    return () => {
      disconnectSocket();
    };
  }, [userId, connectSocket, disconnectSocket]);

  if (areUsersLoading) return <LoadingSpinner />;

  if (!users || users.length === 0) return <div>No users found</div>;
  return (
    <div className="w-full h-full flex justify-center">
      <ChatMessagesSection users={users} onlineUserIds={onlineUsers} />
      {children}
    </div>
  );
};

export default ChatLayoutContainer;
