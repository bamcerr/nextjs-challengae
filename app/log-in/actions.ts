"use server"

import db from "@/lib/db"
import { z } from "zod"
import bcrypt from "bcrypt";
import { loginSession } from "@/lib/session";
import { redirect } from "next/navigation";


let id: number;

const formSchema = z.object({
  email: z
    .string()
    .email(),
  password: z
    .string()
    .trim()
    .min(8, 'Password should be at least 8 characters long.')
    .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).+$/), 'A password must have lowercase, UPPERCASE, a number and special characters.'),
})
  .superRefine(async ({ email, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        password: true,
      }
    });

    if (!user) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "No exist email",
        fatal: true
      })

      return z.NEVER
    }

    if (!await bcrypt.compare(password, user?.password!)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Wrong Password",
        fatal: true
      })

      return z.NEVER
    }

    id = user.id
  })

export default async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      success: result.success,
      erros: result.error?.flatten()
    }
  }

  if (id) {
    await loginSession(id);
    redirect('/profile');
  }
}