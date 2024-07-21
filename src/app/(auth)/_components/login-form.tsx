"use client";
import React, { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { authSchema } from "@/lib/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SigninProps {
  children?: React.ReactNode;
}

type Inputs = z.infer<typeof authSchema>;

const LoginForm: FC<SigninProps> = ({ children }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Inputs) {
    if (!data.email && !data.password) return;
    try {
      setIsPending(true);

      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      if (res?.error) throw new Error(res.error);
      form.reset();
      router.push("/dashboard");
      toast.success("Successfully signed in");
    } catch (err) {
      catchError(err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        autoFocus={false}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="joe@gmail.com" className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          {isPending ? "Logging in.." : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
