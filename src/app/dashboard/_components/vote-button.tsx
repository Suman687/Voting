"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { votingAction } from "../_actions/vote-action";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface VoteButtonProps {
  groupId: string;
  groupEmail: string;
  status: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({
  groupId,
  groupEmail,
  status,
}) => {
  const [pending, startTransition] = React.useTransition();
  const handleClick = () => {
    startTransition(async () => {
      try {
        const res = await votingAction({ groupId, groupEmail });
        if (res?.error) throw new Error(res.error);

        toast.success("Successfully voted.");
      } catch (err) {
        catchError(err);
      }
    });
  };
  return (
    <Button onClick={handleClick} disabled={status || pending} className="w-32">
      {status ? (
        "Voted"
      ) : pending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        "Vote"
      )}
    </Button>
  );
};

export default VoteButton;
