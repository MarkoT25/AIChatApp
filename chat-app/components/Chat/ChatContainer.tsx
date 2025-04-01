"use client";

import { authUser } from "@/lib/authFetching";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import useChat from "@/hooks/useChat";
import { fetchUsersWithLastMessages } from "@/lib/messageFetching";

const ChatContainer = () => {
  const { data: loggedUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });

  const { onlineUsers } = useChat(loggedUser._id || "");

  console.log("online users: ", onlineUsers);

  const { data: users, isLoading: areUsersLoading } = useQuery({
    queryKey: ["mergedUsers"],
    queryFn: () => fetchUsersWithLastMessages(),
  });
  if (areUsersLoading) return <LoadingSpinner />;

  if (!users || users.length === 0) return <div>No users found</div>;
  return (
    <div className="w-full h-full flex flex-col bg-outline justify-center items-center">
      <p className="text-24 font-semibold text-on-surface">No user selected</p>
    </div>
  );
};

export default ChatContainer;
