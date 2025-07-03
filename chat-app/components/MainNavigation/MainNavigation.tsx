"use client";

import React from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import MenuNavUserDropdown from "./MenuNavUserDropdown";
import MenuNavigationButton from "./MenuNavigationButton";
import { UserType } from "@/interfaces/types";

const navButtonsArray = [
  {
    name: "Chat",
    icon: BiSolidMessageRounded,
    path: "/chat",
  },
  {
    name: "More",
    icon: HiMiniSquaresPlus,
    path: "/more",
  },
];

interface MainNavigationProps {
  loggedUser: UserType;
}

const MainNavigation = ({ loggedUser }: MainNavigationProps) => {
  if (!loggedUser || !loggedUser._id) {
    return null;
  }
  return (
    <div className="absolute top-0 left-0 w-[100px] h-full hidden md:flex flex-col justify-between bg-primary-700 py-5">
      <div className="w-full flex flex-col gap-8 px-3">
        <div className="w-full flex justify-center px-3 py-2 bg-surface rounded-bl-xl rounded-tr-xl">
          <p className="text-on-surface font-semibold text-10">AIChat</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6">
          {navButtonsArray.map((button, index) => (
            <MenuNavigationButton button={button} index={index} key={index} />
          ))}
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <MenuNavUserDropdown />
      </div>
    </div>
  );
};

export default MainNavigation;
