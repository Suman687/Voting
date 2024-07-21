import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Please enter the valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long." })
    .max(40, { message: "Password must be less than 40 characters." }),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter the valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long." })
      .max(40, { message: "Password must be less than 40 characters." }),
    confirmPassword: z.string(),

    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." }),

    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters long." }),
    images: z.any(),

    role: z.enum(["voter", "group"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});
