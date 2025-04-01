"use client";

import { authUser } from "@/lib/authFetching";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import SettingsInput from "./SettingsInput";
import DragAndDropMediaUploader from "../ui/DragAndDropMediaUploader";
import { updateProfile } from "@/lib/usersFetching";
import { useRouter } from "next/navigation";
import SettingsHeader from "./SettingsHeader";
import SettingsAvatar from "./SettingsAvatar";
import SettingsActions from "./SettingsActions";

interface UpdateProfileParams {
  username?: string;
  profilePic?: string;
  description?: string;
  gender?: string;
  age?: number;
}

const SettingsContainer = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: loggedUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({
      username,
      profilePic,
      description,
      gender,
      age,
    }: UpdateProfileParams) =>
      updateProfile({ username, profilePic, description, gender, age }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsUpdating(false);
      router.push("/profile");
      alert("Profile updated successfully");
    },
  });

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | FileList
  ) => {
    const files = event instanceof FileList ? event : event.target.files;
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(event.currentTarget);

    const username = formData.get("username") as string;
    const description = formData.get("description") as string;
    const age = formData.get("age") as string;
    const gender = formData.get("gender") as string;

    const params: UpdateProfileParams = {};

    if (username) params.username = username;
    if (description) params.description = description;
    if (age) params.age = parseInt(age, 10) || undefined;
    if (gender) params.gender = gender;
    if (imagePreview) params.profilePic = imagePreview;

    updateProfileMutation.mutate(params);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="w-full flex flex-col px-5 xl:px-[250px] gap-6"
    >
      <SettingsHeader />

      <div className="w-full flex flex-col gap-6 pt-11 ">
        <SettingsInput
          label="Username"
          type="text"
          name="username"
          placeholder={loggedUser?.username || "Username"}
        />
        <SettingsInput
          label="Description"
          type="text"
          name="description"
          placeholder={loggedUser?.description || "Description"}
        />
        <SettingsInput
          label="Age"
          type="number"
          name="age"
          placeholder={loggedUser?.age || "Age"}
        />
        <SettingsInput
          label="Gender"
          type="text"
          name="gender"
          placeholder={loggedUser.gender || "Gender"}
        />
      </div>
      <div className="w-full h-[150px] flex items-center justify-center gap-[20px]">
        <SettingsAvatar imagePreview={imagePreview} />
        <DragAndDropMediaUploader
          name="profilePic"
          ref={profilePicRef}
          handleImageFileChange={handleImageFileChange}
        />
      </div>
      <SettingsActions isUpdating={isUpdating} />
    </form>
  );
};

export default SettingsContainer;
