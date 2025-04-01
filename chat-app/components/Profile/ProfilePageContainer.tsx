"use client";

import { authUser } from "@/lib/authFetching";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/image";
import ProfilePageInfoCard from "./ProfilePageInfoCard";
import { IoPerson } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ProfilePageContainer = () => {
  const router = useRouter();
  const { data: loggedUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });

  const handleRedirectToSettings = () => {
    router.push("/settings");
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-4 px-5">
      <div className="w-[400px] flex flex-col items-center gap-6 p-5 bg-white-opacity-5 rounded-lg ">
        {loggedUser.profilePic !== "" && (
          <Image
            src={loggedUser.profilePic}
            alt="Profile Picture"
            width={200}
            height={200}
            className="w-full h-[200px] rounded-3xl"
          />
        )}

        {loggedUser.profilePic === "" && (
          <IoPerson className="size-[200px] rounded-full text-primary border-2 border-primary p-11" />
        )}

        <div className="w-full flex flex-col gap-2">
          <ProfilePageInfoCard label="Username" text={loggedUser.username} />
          <ProfilePageInfoCard
            label="Description"
            text={loggedUser.description || "No description"}
          />
          <ProfilePageInfoCard label="Age" text={loggedUser.age || "No age"} />
          <ProfilePageInfoCard
            label="Gender"
            text={loggedUser.gender || "No gender"}
          />
        </div>
        <div className="w-full">
          <Button
            variant="default"
            onClick={handleRedirectToSettings}
            className="w-full"
          >
            Edit profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
