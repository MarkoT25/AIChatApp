import { MessageType } from "@/interfaces/types";
import React, { useEffect, useRef } from "react";
import ChatBoxDateSeparator from "./ChatBoxDateSeparator";
import ChatboxMessage from "./ChatboxMessage";
import useUserStore from "@/store/useUserStore";

interface ChatboxTextAreaProps {
  messages: MessageType[];
}

const ChatboxTextArea = ({ messages }: ChatboxTextAreaProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const [groupedMessages, setGroupedMessages] = React.useState<
    Record<string, MessageType[]>
  >({});

  useEffect(() => {
    if (selectedUser) {
      const grouped = messages.reduce(
        (acc: Record<string, MessageType[]>, message) => {
          const date = new Date(message.createdAt).toLocaleDateString();
          if (!acc[date]) acc[date] = [];
          acc[date].push(message);
          return acc;
        },
        {}
      );
      setGroupedMessages(grouped);
    }
  }, [messages, selectedUser]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [groupedMessages]);

  if (messages.length === 0)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-on-surface-variant text-3xl ">No messages found</p>
      </div>
    );

  return (
    <div className="w-full h-[800px] overflow-y-auto fancy-scrollbar p-4">
      {Object.entries(groupedMessages).map(
        ([date, messagesForDate], index: number) => (
          <div key={index} className="w-full">
            <ChatBoxDateSeparator date={date} />
            {messagesForDate.map((message) => (
              <ChatboxMessage
                key={message._id}
                message={message}
                selectedUser={selectedUser}
              />
            ))}
          </div>
        )
      )}
      <div ref={messageEndRef} className="h-5 w-full" />
    </div>
  );
};

export default ChatboxTextArea;
