import React from "react";

const SettingsHeader = () => {
  return (
    <div className="w-full flex flex-col gap-1 border-b-[1.5px] border-white-opacity-5 pb-2 pt-11">
      <h1 className="text-xl text-on-surface font-semibold">Update profile</h1>
      <p className="text-sm text-on-surface-variant">
        Update your profile information and profile picture.
      </p>
    </div>
  );
};

export default SettingsHeader;
