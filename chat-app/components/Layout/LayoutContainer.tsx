import React from "react";
import MainNavigation from "../MainNavigation/MainNavigation";
import { authUser } from "@/lib/authFetching";

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer = async ({ children }: LayoutContainerProps) => {
  const user = await authUser();
  return (
    <div className="relative w-full h-[100vh] flex justify-center">
      <MainNavigation loggedUser={user} />
      <div className={`w-full ${user?._id && "md:pl-[100px]"}`}>{children}</div>
    </div>
  );
};

export default LayoutContainer;
