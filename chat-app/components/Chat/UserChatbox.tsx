import React from "react";
import { MessageType } from "@/interfaces/types";
import UserChatboxHeader from "./UserChatboxHeader";
import LoadingSpinner from "../LoadingSpinner";
import UserChatboxInput from "./UserChatboxInput";
import ChatboxTextArea from "./ChatboxTextArea";
import useUserStore from "@/store/useUserStore";
import { useParams } from "next/navigation";

interface UserChatboxProps {
  messages: MessageType[];
  areStoredMessagesLoading: boolean;
}

const UserChatbox = ({
  messages,
  areStoredMessagesLoading,
}: UserChatboxProps) => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const params = useParams();
  const recieverId = params.id as string;

  if (!selectedUser) {
    return (
      <div className="w-full h-full flex flex-col bg-outline justify-center items-center">
        <p className="text-24 font-semibold text-on-surface">
          No user selected
        </p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col bg-outline justify-between">
      <UserChatboxHeader  />
      {areStoredMessagesLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ChatboxTextArea messages={messages} />
      )}
      <UserChatboxInput recieverId={recieverId} />
    </div>
  );
};

export default UserChatbox;
