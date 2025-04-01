"use client";

import useChat from "@/hooks/useChat";
import { authUser } from "@/lib/authFetching";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
}

const LayoutClientWrapper = ({ children }: LayoutClientWrapperProps) => {
  const { data: loggedUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });
  
  console.log("logged user: ", loggedUser?._id);
  const { onlineUsers } = useChat(loggedUser?._id || "");

  console.log("online users: ", onlineUsers);
  return <div className="w-full pl-[100px]">{children}</div>;
};

export default LayoutClientWrapper;
