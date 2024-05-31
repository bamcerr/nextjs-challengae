"use server";

import db from "@/lib/db";



export async function getTweet(id: number) {

  const tweet = await db.tweet.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      tweet: true,
      user: true,
      created_at: true,
      updated_at: true,
      Like: true
    },
  })
  return tweet
}