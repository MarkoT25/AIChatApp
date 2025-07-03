import SignUpContainer from "@/components/SignUP/SignUpContainer";
import { authUser } from "@/lib/authFetching";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const user = await authUser();
  if (user?._id) {
    redirect("/chat");
  }
  return <SignUpContainer />;
};

export default SignInPage;
