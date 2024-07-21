"use client";
import React, { useState } from "react";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
      setIsShowPassword(!isShowPassword);
    };

    return (
      <div className="relative">
        <Input
          placeholder="********"
          type={isShowPassword ? "text" : "password"}
          className={cn("pr-8", className)}
          ref={ref}
          {...props}
        />
        <div
          className="absolute top-3 right-2 cursor-pointer"
          onClick={handleShowPassword}
        >
          {isShowPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
