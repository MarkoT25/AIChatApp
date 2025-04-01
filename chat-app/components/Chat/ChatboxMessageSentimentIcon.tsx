import { MessageType } from "@/interfaces/types";
import React from "react";

const determineSentimentIcon = (score: number) => {
  if (score > 0.5) return "😊";
  if (score < -0.5) return "😡";
  return "😐";
};

const determineSentimentColor = (score: number) => {
  if (score > 0.5) return "green-500";
  if (score < -0.5) return "red-500";
  return "primary";
};

export const ChatboxMessageSentimentIcon = ({
  message,
}: {
  message: MessageType;
}) => {
  const sentimentColor = determineSentimentColor(message?.sentimentScore);
  return (
    <div
      className={`size-8 flex items-center justify-center border-2  border-${sentimentColor} rounded-full`}
    >
      {determineSentimentIcon(message.sentimentScore)}{" "}
    </div>
  );
};
