"use server"

import { z } from "zod"


const formSchema = z.object({
  email: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1).refine(pw => pw === "12345", "Wrong password.")
})

export default async function login(_:any, formData:FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password")
  }

  const result = formSchema.safeParse(data);
  
  return {
    success: result.success,
    erros: result.error?.flatten()
  }
}