import { authUser } from "@/lib/authFetching";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    redirect("/login");
  }

  const user = await authUser();
  console.log("Authenticated user:", user);
  if (!user?._id) {
    redirect("/login");
  } else {
    redirect("/chat");
  }

  return <div>Landing page</div>;
}
