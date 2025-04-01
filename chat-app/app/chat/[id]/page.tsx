import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserChatPageContainer from "@/components/UserChatPage/UserChatPageContainer";
import { fetchMessages } from "@/lib/messageFetching";


interface UserChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

const UserChatPage = async (props: UserChatPageProps) => {
  const params = await props.params;
  const recieverId = params.id as string;


  if (!recieverId) {
    return <div>No user found</div>;
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["messages", recieverId],
    queryFn: () => fetchMessages(recieverId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserChatPageContainer />
    </HydrationBoundary>
  );
};

export default UserChatPage;
