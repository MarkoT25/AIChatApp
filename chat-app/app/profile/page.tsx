import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProfilePageContainer from "@/components/Profile/ProfilePageContainer";
import { authUser } from "@/lib/authFetching";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    redirect("/login");
  }
  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });

  if (!user?._id) {
    redirect("/login");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePageContainer />
    </HydrationBoundary>
  );
};

export default ProfilePage;
