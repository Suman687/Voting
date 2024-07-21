import React from "react";
import UserProfile from "./_components/user-profile";
import prisma from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import GroupProfile from "./_components/group-profile";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  if (!user) redirect("/login");
  return (
    <div className="flex gap-4 p-2 ">
      <UserProfile
        name={user.name!}
        address={user.address}
        email={user.email!}
        status={user.hasVoted}
        imageUrl={user.imageUrl}
      />
      <GroupProfile userStatus={user.hasVoted ?? false} />
    </div>
  );
};

export default page;
