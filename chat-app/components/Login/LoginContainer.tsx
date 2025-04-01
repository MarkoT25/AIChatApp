"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { fetchSignIn } from "@/lib/authFetching";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginData) =>
      fetchSignIn(email, password),
    onSuccess: (data) => {
      if (data === "success") {
        console.log("Login success", data);
        router.push("/chat");
      } else {
        console.log("Login error", data);
        setIsSigningIn(false);
      }
    },
  });

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSigningIn(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      alert("Please fill in all fields");
      setIsSigningIn(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      setIsSigningIn(false);
      return;
    }

    loginMutation.mutate({ email, password });
    setIsSigningIn(false);
  };
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-surface">
      <form
        onSubmit={(event) => handleSignIn(event)}
        className="w-1/3 flex flex-col gap-11"
      >
        <div className="w-full flex justify-center items-center">
          <p className="text-24 text-on-surface font-semibold">Sign Up</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full h-[45px] bg-inherit border-2 border-white-opacity-5 text-on-surface"
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full h-[45px] bg-inherit border-2 border-white-opacity-5 text-on-surface"
          />
        </div>

        <Button variant="default" type="submit" disabled={isSigningIn}>
          {isSigningIn ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LoginContainer;
