import ChatContainer from "@/components/Chat/ChatContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ChatPage = async () => {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    redirect("/login");
  }
  return <ChatContainer />;
};

export default ChatPage;
