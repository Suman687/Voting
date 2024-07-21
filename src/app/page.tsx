import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  if (user) redirect("/dashboard");
  redirect("/login");
  return <div></div>;
}
