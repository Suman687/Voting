import React from "react";
import LoginForm from "../_components/login-form";
import Link from "next/link";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-4">
      <h1 className="font-semibold text-2xl">Login</h1>
      <LoginForm />
      <div className="flex gap-1 text-sm">
        <span>New user? </span>
        <Link href="/register" className="text-blue-900">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default page;
