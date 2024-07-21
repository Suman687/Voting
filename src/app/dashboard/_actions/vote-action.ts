"use server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const votingAction = async ({
  groupId,
  groupEmail,
}: {
  groupId: string;
  groupEmail: string;
}) => {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (user?.hasVoted) return;

    const group = await prisma.group.findFirst({
      where: {
        email: groupEmail,
      },
    });

    if (group) {
      await prisma.group.update({
        where: {
          id: group.id,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          hasVoted: true,
        },
      });
    } else {
      await prisma.group.create({
        data: {
          email: groupEmail,
          count: 1,
        },
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          hasVoted: true,
        },
      });
    }
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Already created." };
    }
    return { error: "Error while voting" };
  }
};
