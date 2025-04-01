import Image from "next/image";
import React from "react";
import { IoPerson } from "react-icons/io5";

const SettingsAvatar = ({ imagePreview }: { imagePreview: string | null }) => {
  return (
    <div className="w-[60px] h-full flex items-start">
      {!imagePreview && (
        <div className="size-[60px] flex items-center justify-center rounded-full border-[1.5px] border-white-opacity-5 p-1">
          <IoPerson className="text-on-surface" />
        </div>
      )}
      {imagePreview && (
        <Image
          src={imagePreview}
          alt="Profile Picture"
          width={60}
          height={60}
          className="rounded-full size-[60px] min-w-[60px] min-h-[60px]"
        />
      )}
    </div>
  );
};

export default SettingsAvatar;
