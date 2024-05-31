"use server"

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { loginSession } from "@/lib/session";
import { redirect } from "next/navigation";


const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email(),
  username: z
    .string()
    .trim()
    .refine((username) => { if (username === "") { return true } else { return username.length > 2 } }, "Username sould be at least 2 characters long."),
  bio: z
    .string(),
  password: z
    .string()
    .trim()
    .min(8, 'Password should be at least 8 characters long.')
    .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).+$/), 'A password must have lowercase, UPPERCASE, a number and special characters.'),
  confirmPassword: z
    .string()
    .trim()
    .min(8)
})
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Both passwords should be the same",
    path: ["confirmPassword"]
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    })
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true
      })
    }

    return z.NEVER
  })

export default async function createAccount(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    bio: formData.get("bio"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  }

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      success: result.success,
      erros: result.error?.flatten()
    }
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedPassword,
      bio: result.data.bio
    },
    select: {
      id: true
    }
  });

  await loginSession(user.id);

  redirect("/");
}