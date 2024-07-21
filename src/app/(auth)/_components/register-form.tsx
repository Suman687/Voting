"use client";
import React, { FC, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { z } from "zod";
import { registerSchema } from "@/lib/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { FileWithPreview } from "@/types";
import { Zoom } from "./image-zoom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { signupAction } from "../_actions/signup-action";
import { useRouter } from "next/navigation";

interface SignupProps {
  children?: React.ReactNode;
}

type Inputs = z.infer<typeof registerSchema>;

const FileDialog = dynamic(() => import("./file-dialog"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-8 " />,
});
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const SignupForm: FC<SignupProps> = ({ children }) => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const { isUploading, startUpload } = useUploadThing("profileImage");
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      images: undefined,
      role: "voter",
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (data.images.length === 0) throw new Error("Please select an image");
        const image = await startUpload(data.images);

        const formattedImagesUrl = image?.map((image) => {
          return image.url;
        });
        const res = await signupAction({ ...data, images: formattedImagesUrl });
        if (res?.error) throw new Error(res.error);
        form.reset();
        router.push("/login");
        toast.success(
          "Successfully created account. Please proceed to sign in."
        );
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        autoFocus={false}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                {...form.register("name")}
                placeholder="Type your name here"
                className=""
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.name?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...form.register("email")}
                placeholder="joe@gmail.com"
                className=""
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.email?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <PasswordInput {...form.register("password")} />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.password?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput {...form.register("confirmPassword")} />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.confirmPassword?.message}
            />
          </FormItem>
        </div>
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input
              {...form.register("address")}
              placeholder="Type your address here"
              className=""
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.address?.message}
          />
        </FormItem>

        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}

          <FormControl>
            <FileDialog
              name="images"
              disabled={isPending}
              //@ts-ignore
              setValue={form.setValue}
              files={files}
              setFiles={setFiles}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message as string}
          />
        </FormItem>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your role</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="voter">Voter</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending && (
            <Loader2 name="loader-2" className="mr-2 w-4 h-4 animate-spin" />
          )}
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
