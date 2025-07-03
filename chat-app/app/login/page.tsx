import LoginContainer from "@/components/Login/LoginContainer";
import { authUser } from "@/lib/authFetching";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const user = await authUser();
  if (user?._id) {
    redirect("/chat");
  }
  return <LoginContainer />;
};

export default LoginPage;
