import { UserType } from "@/interfaces/types";
import useUserStore from "@/store/useUserStore";
import {formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import React from "react";
import { IoPerson } from "react-icons/io5";

interface ChatSelectionCardProps {
  handleSelectUser: (user: UserType) => void;
  user: UserType;
  onlineUserIds: string[];
}

const ChatSelectionCard = ({
  handleSelectUser,
  user,
  onlineUserIds,
}: ChatSelectionCardProps) => {
  const selectedUser = useUserStore((state) => state.selectedUser);

  const relativeTime = user?.lastMessage?.createdAt
  ? formatDistanceToNowStrict(new Date(user.lastMessage.createdAt))
      .replace("minute", "min")
      .replace("minutes", "min")
      .replace("hour", "h")
      .replace("hours", "h")
      .replace("day", "d")
      .replace("days", "d")
      .replace("month", "m")
      .replace("months", "m")
      .replace("year", "y")
      .replace("years", "y")
  : "";

  return (
    <div
      onClick={() => handleSelectUser(user)}
      key={user._id}
      className={`w-full flex items-center justify-between gap-2 py-2 px-3 cursor-pointer transform-color duration-300 ${
        selectedUser?._id === user._id && "bg-primary bg-opacity-20 rounded-lg"
      }`}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="relative inline-block">
          {user.profilePic ? (
            <Image
              src={user.profilePic}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full size-[40px]"
            />
          ) : (
            <IoPerson className="size-[40px] rounded-full p-2 border-[1.5px] border-gray-500" />
          )}
          {onlineUserIds.includes(user._id) && (
            <div className="absolute bottom-0 right-0 size-3 rounded-full bg-success border-2 border-white"></div>
          )}
          {!onlineUserIds.includes(user._id) && (
            <div className="absolute bottom-0 right-0 size-3 rounded-full bg-gray-700 border border-outline"></div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-14 text-on-surface font-semibold">
            {user.username}
          </p>
          <p className="text-sm text-on-surface-variant">
            {user.lastMessage?.text
              ? user.lastMessage.text.length > 25
                ? `${user.lastMessage.text.substring(0, 25)}...`
                : user.lastMessage.text
              : "No messages"}
          </p>
        </div>
      </div>
      <p className="text-on-surface-variant text-[10px] font-semibold">{relativeTime}</p>
    </div>
  );
};

export default ChatSelectionCard;
