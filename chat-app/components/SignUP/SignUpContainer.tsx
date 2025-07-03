"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { fetchSignUp } from "@/lib/authFetching";
import { Input } from "../ui/input";
import { validateSignUp } from "@/util/auth.util";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

const SignUpContainer = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpMutation = useMutation({
    mutationFn: ({ username, email, password }: SignUpData) =>
      fetchSignUp(username, email, password),
    onSuccess: (data) => {
      if (data.message === "User created successfully") {
        console.log("Sign up success", data);
        router.push("/chat");
        setIsCreating(false);
      }
      console.log("Sign up error", data);
      setError(data);
      setIsCreating(false);
    },
    onError: (error) => {
      console.log("Sign up error", error);
    },
  });

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = validateSignUp(formData);

    if (validation) {
      alert(validation);
      setIsCreating(false);
      return;
    }

    signUpMutation.mutate({ username, email, password });
    e.currentTarget.reset();
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-surface">
      <form
        onSubmit={(event) => handleSignUp(event)}
        className="w-1/3 flex flex-col gap-8"
      >
        <div className="w-full flex justify-center items-center">
          <p className="text-24 text-on-surface font-semibold">Sign Up</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            className="w-full h-[45px] bg-inherit border-2 border-white-opacity-5 text-on-surface"
          />

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
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            className="w-full h-[45px] bg-inherit border-2 border-white-opacity-5 text-on-surface"
          />
        </div>

        {error && (
          <div className="w-full flex justify-center items-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <p>Already have an account? </p>
          <Link href="/login" className="text-primary-500 font-semibold ml-1">
            Sign In
          </Link>
        </div>

        <Button variant="default" type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUpContainer;
