"use server"

import { z } from "zod"


const formSchema = z.object({
  email: z.string().email().regex(new RegExp(/^[a-zA-Z0-9+-\_.]+@zod.com/), "Only @zod.com emails are allowed"),
  username: z.string().min(5, 'Username sould be at least 5 chracters long.'),
  password: z.string().min(10, 'Password should be at least 10 characters long.')
  .regex(new RegExp(/\d/), 'Password sholud contain at least one number (0123456789).')
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