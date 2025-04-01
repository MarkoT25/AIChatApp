"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import LogoutModal from "./LogoutModal";

const MenuNavUserDropdown = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoPerson className="size-[40px] rounded-full text-on-surface bg-surface p-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-[80px] rounded-tl-xl rounded-r-xl rounded-bl-none text-on-surface">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleOpenLogoutModal}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isLogoutModalOpen && (
        <LogoutModal
          isOpen={isLogoutModalOpen}
          setIsOpen={setIsLogoutModalOpen}
        />
      )}
    </>
  );
};

export default MenuNavUserDropdown;
