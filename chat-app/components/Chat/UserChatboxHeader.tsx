import useUserStore from "@/store/useUserStore";
import Image from "next/image";
import React from "react";
import { IoCamera, IoPerson } from "react-icons/io5";

const UserChatboxHeader = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  return (
    <div className="w-full flex items-center justify-between border-b-[1.5px] border-gray-800 px-5 py-5">
      <div className="flex items-center justify-center gap-2">
        {!selectedUser?.profilePic  && (
          <IoPerson className="size-[40px] rounded-full p-2 border-[1.5px] border-gray-500" />
        )}
        {selectedUser?.profilePic && (
          <Image
            src={selectedUser?.profilePic}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <p className="text-18 text-on-surface font-semibold">
          {selectedUser?.username}
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <IoCamera className="size-[40px] bg-white bg-opacity-10 p-2 text-primary-700 rounded-full" />
      </div>
    </div>
  );
};

export default UserChatboxHeader;
