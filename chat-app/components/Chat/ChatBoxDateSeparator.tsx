import React from "react";

interface ChatBoxDateSeparatorProps {
  date: string;
}

const ChatBoxDateSeparator = ({ date }: ChatBoxDateSeparatorProps) => {
  return (
    <div className="flex justify-center my-2">
      <span className="bg-gray-300 text-surface-variant px-3 py-1 rounded-full text-sm">
        {date}
      </span>
    </div>
  );
};

export default ChatBoxDateSeparator;
