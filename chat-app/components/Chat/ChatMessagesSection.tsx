import { UserType } from "@/interfaces/types";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import React from "react";
import ChatSelectionCard from "./ChatSelectionCard";

interface ChatMessagesSectionProps {
  users: UserType[];
  onlineUserIds: string[];
}

const ChatMessagesSection = ({
  users,
  onlineUserIds,
}: ChatMessagesSectionProps) => {
  const router = useRouter();
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user);
    router.push(`/chat/${user._id}`);
  };
  return (
    <div className="hidden md:flex w-[20%] min-w-[320px] flex-col gap-3 h-full bg-surface">
      <div className="w-full flex items-center justify-start p-5 border-b-[1.5px] border-gray-800">
        <p className="text-20 h-[40px] flex items-center text-on-surface font-semibold">
          Chats
        </p>
      </div>
      <div className="w-full flex flex-col justify-start gap-3 px-2 overflow-y-auto fancy-scrollbar">
        {users?.map((user: UserType) => (
          <ChatSelectionCard
            key={user._id}
            handleSelectUser={handleSelectUser}
            user={user}
            onlineUserIds={onlineUserIds}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMessagesSection;
