import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getTweetList } from "./actions";
import { dateFormat } from "@/lib/utils";
import AddTweet from "@/components/add-tweet";
import { pagenationLength } from "@/lib/constants";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const [count, tweets] = await getTweetList(page);

  return (
    <main className="max-w-screen-sm mx-auto py-20">
      <h1 className="text-center text-2xl">Tweet</h1>

      <AddTweet />

      <div className="flex justify-between px-10 mt-5">
        <div className="flex justify-start min-w-10">
          {page !== 1 ? <Link href={`/?page=${(page - 1)}`}>
            <ArrowLeftIcon className="size-6" />
          </Link> : null
          }

        </div>

        <div className="flex justify-end min-w-10">
          {page * pagenationLength < count ? <Link href={`/?page=${(page + 1)}`}>
            <ArrowRightIcon className="size-6" />
          </Link> : null}
        </div>
      </div>

      <ul className="mt-1">
        {tweets?.map((item, index) => (
          <li key={item.id} className="mt-3 border-t">
            <Link href={`/${item.id}`} className="my-2 flex items-stretch px-4">
              <div className="w-6 flex items-center">
                {item.id}
              </div>
              <div>
                <div className="text-lg font-semibold">{item.tweet}</div>
                <div className="text-sm text-gray-500"> {item.user.email} {dateFormat(item.updated_at) || dateFormat(item.created_at)}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>);
}
