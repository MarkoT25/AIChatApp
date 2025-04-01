"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuNavigationButtonProps {
  index: number;
  button: {
    name: string;
    icon: React.ElementType;
    path: string;
  };
}

const MenuNavigationButton = ({ button, index }: MenuNavigationButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(button.path.replace(/\//g, ""));
  return (
    <Link href={button.path} key={index}>
      <button.icon color={isActive ? '#FEFEFE' : '#28282A'} className="size-[24px] text-on-surface transform-color duration-200" />
    </Link>
  );
};

export default MenuNavigationButton;
