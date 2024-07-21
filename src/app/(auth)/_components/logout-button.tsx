"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
  );
};

export default LogoutButton;
