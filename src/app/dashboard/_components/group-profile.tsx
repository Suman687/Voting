import { Button } from "@/components/ui/button";
import prisma from "@/lib/prismaClient";
import Image from "next/image";
import React from "react";
import VoteButton from "./vote-button";
import { count } from "console";

interface GroupProfileProps {
  userStatus: boolean;
}

const GroupProfile: React.FC<GroupProfileProps> = async ({ userStatus }) => {
  const groups = await prisma.user.findMany({
    where: {
      role: "group",
    },
  });
  const groupCounts = await prisma.group.findMany();

  const findCount = (email: string) => {
    const count = groupCounts.find((g) => g.email === email);
    if (!count) return null;
    return count?.count;
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 bg-slate-500 p-4 rounded-lg">
      {groups.length > 0 ? (
        groups.map((group, i) => (
          <div key={i} className="flex justify-between p-2 items-center">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-bold">Group Name: </span>
                <span>{group.name}</span>
              </div>
              <div>
                <span className="font-bold">Votes: </span>
                <span>
                  {findCount(group.email ?? "")
                    ? findCount(group.email ?? "")
                    : 0}
                </span>
              </div>
              <VoteButton
                groupId={group.id!}
                groupEmail={group.email!}
                status={userStatus ?? false}
              />
            </div>
            <Image
              src={group.imageUrl}
              alt="group image"
              width={200}
              height={200}
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>
        ))
      ) : (
        <div>No groups found</div>
      )}
    </div>
  );
};

export default GroupProfile;
