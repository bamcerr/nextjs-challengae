"use server";

import db from "@/lib/db";


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
      skip: (page - 1) * 1,
      take: 1,
      orderBy: {
        updated_at: "desc"
      }
    })
  ]);
  console.log(tweetList)

  return tweetList;
}