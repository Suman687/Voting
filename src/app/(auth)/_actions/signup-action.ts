"use server";

import prisma from "@/lib/prismaClient";
import { registerSchema } from "@/lib/validation/auth";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { z } from "zod";

type dataType = z.infer<typeof registerSchema>;

export const signupAction = async (data: dataType) => {
  try {
    const validData = registerSchema.parse(data);
    const hashedPassword = await hash(validData.password, 12);
    await prisma.user.create({
      data: {
        email: validData.email,
        password: hashedPassword,
        address: validData.address,
        name: validData.name,
        role: validData.role,
        imageUrl: validData.images[0],
      },
    });
  } catch (error: any) {
    console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Account is already created. Please proceed to login." };
    }
    return { error: "Error while creating account" };
  }
};
