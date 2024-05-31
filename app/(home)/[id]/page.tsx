import { dateFormat } from "@/lib/utils";
import { getTweet } from "./actions";

interface TwetProps {
  params: { id: string };
}

export default async function Tweet({ params }: TwetProps) {

  const tweet = await getTweet(Number(params.id));
  return (
    <main>
      <div className="p-4">
        Id: {tweet?.id} <br />
        email: {tweet?.user.email} <br />
        username: {tweet?.user.username} <br />
        tweet: {tweet?.tweet} <br />
        created: {dateFormat(tweet?.created_at)} <br />
        updated: {dateFormat(tweet?.updated_at)} <br />
        like: {tweet?.Like.join(',')}
      </div>
    </main>
  )
}