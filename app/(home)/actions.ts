"use server";

import { pagenationLength } from "@/lib/constants";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";


export async function getTweetList(page: number) {
  const tweetList = await db.$transaction([
    db.tweet.count(),
    db.tweet.findMany({
      select: {
        id: true,
        tweet: true,
        user: { select: { username: true, email: true } },
        created_at: true,
        updated_at: true
      },
      skip: (page - 1) * pagenationLength,
      take: pagenationLength,
      orderBy: {
        updated_at: "desc"
      }
    })
  ]);

  if (tweetList[1].length === 0) {
    notFound()
  }

  return tweetList;
}


const formSchema = z.object({
  tweet: z.string().min(2),
  userId: z.number()
})

export async function addTweet(prevState: any, formData: FormData) {
  const session = await getSession();

  const data = {
    tweet: formData.get('tweet'),
    userId: session.id
  }

  const result = await formSchema.safeParse(data)

  if (!result.success) {
    return {
      data: null,
      error: result.error.flatten()
    }
  }

  const tweet = await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      userId: result.data.userId
    }
  })

  revalidatePath('/', 'page')

  return {
    data: tweet,
    error: null
  }
}