import React from "react";
import { Input } from "../ui/input";

interface SettingsInputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

const SettingsInput = ({
  label,
  type,
  placeholder,
  name,
}: SettingsInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-on-surface font-medium">{label}</p>
      <Input type={type} name={name} placeholder={placeholder} className="w-full h-[44px]"/>
    </div>
  );
};

export default SettingsInput;
