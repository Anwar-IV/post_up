import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import UserPost from "./UserPost";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl text-center font-bold">
        Welcome back {session.user?.name}
      </h1>
      <UserPost />
    </main>
  );
}
