import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import LogoutButton from "../(auth)/_components/logout-button";
import Link from "next/link";
import BackButton from "./_components/back-button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col p-4">
      <div className="h-28 w-full flex justify-between items-center">
        <BackButton />
        <h1 className="text-3xl font-semibold">Online Voting System</h1>
        <LogoutButton />
      </div>
      <Separator className="bg-slate-500" />
      {children}
    </div>
  );
}
