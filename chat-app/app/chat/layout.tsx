import ChatLayoutContainer from "@/components/Chat/ChatLayoutContainer";
import { authUser } from "@/lib/authFetching";
import { fetchUsersWithLastMessages } from "@/lib/messageFetching";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["authUser"],
    queryFn: () => authUser(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["mergedUsers"],
    queryFn: () => fetchUsersWithLastMessages(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatLayoutContainer>{children}</ChatLayoutContainer>
    </HydrationBoundary>
  );
}
