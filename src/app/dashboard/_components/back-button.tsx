"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = ({}) => {
  const router = useRouter();
  return <Button onClick={() => router.back()}>Back</Button>;
};

export default BackButton;
