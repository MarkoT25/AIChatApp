import { MessageType } from "@/interfaces/types";

export const mergeAndSortMessages = (
  storedMessages: MessageType[],
  socketMessages: MessageType[]
): MessageType[] => {
  const merged = [...storedMessages, ...socketMessages];

  // Remove duplicates based on `_id`
  const uniqueMessages = Array.from(new Map(merged.map((msg) => [msg._id, msg])).values());

  // Sort by timestamp
  return uniqueMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};
