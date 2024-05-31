"use server";

import db from "@/lib/db";
import { getSession, logoutSession } from "@/lib/session";
import { redirect } from "next/navigation";


export async function getProfile() {
  const { id } = await getSession();
  const user = await db.user.findUnique({
    where: {
      id
    },
    select: {
      email: true,
      username: true,
      bio: true
    }
  });

  return user
}


export async function logout() {
  await logoutSession();
  redirect('/create-account');
}