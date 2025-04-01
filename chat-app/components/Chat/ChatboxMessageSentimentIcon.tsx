import { MessageType } from "@/interfaces/types";
import React from "react";

const determineSentimentIcon = (score: number) => {
  if (score > 0.5) return "😊";
  if (score < -0.5) return "😡";
  return "😐";
};

const determineSentimentColor = (score: number) => {
  if (score > 0.5) return "#12B76A";
  if (score < -0.5) return "#F04438";
  return "#0C75AF";
};

export const ChatboxMessageSentimentIcon = ({
  message,
}: {
  message: MessageType;
}) => {
  const sentimentColor = determineSentimentColor(message?.sentimentScore);
  return (
    <div
    style={{borderColor: sentimentColor}}
      className={`size-8 flex items-center justify-center border-2 rounded-full`}
    >
      {determineSentimentIcon(message.sentimentScore)}{" "}
    </div>
  );
};
