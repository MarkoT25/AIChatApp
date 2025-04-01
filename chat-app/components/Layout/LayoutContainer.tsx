import React from "react";
import MainNavigation from "../MainNavigation/MainNavigation";

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div className="relative w-full h-[100vh] flex justify-center">
      <MainNavigation />
      <div className="w-full md:pl-[100px]">{children}</div>
    </div>
  );
};

export default LayoutContainer;
