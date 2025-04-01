import React from "react";

interface ProfilePageInfoCardProps {
  label: string;
  text: string;
}

const ProfilePageInfoCard = ({ label, text }: ProfilePageInfoCardProps) => {
  const isInfoFlex = text.length > 30;

  return (
    <div
      className={`w-full flex ${
        isInfoFlex ? "flex-col items-start" : "items-center"
      } gap-1`}
    >
      <p className="text-xs text-on-surface-variant uppercase">{label}:</p>
      <p className="text-md text-on-surface font-medium">{text}</p>
    </div>
  );
};

export default ProfilePageInfoCard;
