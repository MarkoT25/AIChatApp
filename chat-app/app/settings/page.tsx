import SettingsContainer from "@/components/Settings/SettingsContainer";
import { authUser } from "@/lib/authFetching";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async () => {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    redirect("/login");
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsContainer />
    </HydrationBoundary>
  );
};

export default SettingsPage;
