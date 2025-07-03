import { MessageType, UserType } from "@/interfaces/types";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ChatboxMessageSentimentIcon } from "./ChatboxMessageSentimentIcon";

interface ChatboxMessageProps {
  message: MessageType;
  selectedUser: UserType | null;
}

const ChatboxMessage = ({ message, selectedUser }: ChatboxMessageProps) => {
  const isUserMessage = message.senderId !== selectedUser?._id;

  return (
    <div
      className={`flex ${isUserMessage ? "justify-end" : "justify-start"} my-1`}
    >
      <div className="flex items-center justify-start gap-2">
        {!isUserMessage && <ChatboxMessageSentimentIcon message={message} />}
        <div
          className={`flex flex-col ${
            isUserMessage ? "items-end" : "items-start"
          }`}
        >
          {message.image && (
            <div className="rounded-lg overflow-hidden mb-1">
              <Image
                src={message.image}
                alt="Message Image"
                width={200}
                height={200}
              />
            </div>
          )}
          <div
            className={`relative text-16 max-w-xs font-medium px-4 py-1 rounded-2xl  ${
              isUserMessage
                ? "bg-primary-700 text-on-surface rounded-br-none"
                : "bg-surface-variant text-on-surface rounded-bl-none"
            }`}
          >
            {message.text}
            <div
              className={`text-xs text-on-surface-variant ${
                isUserMessage ? "text-right" : "text-left"
              }`}
            >
              {format(new Date(message.createdAt), "p")}
            </div>
          </div>
        </div>
        {isUserMessage && <ChatboxMessageSentimentIcon message={message} />}
      </div>
    </div>
  );
};


export default ChatboxMessage;
