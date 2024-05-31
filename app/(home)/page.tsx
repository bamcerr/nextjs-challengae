import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getTweetList } from "./actions";
import { dateFormat } from "@/lib/utils";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const [count, tweets] = await getTweetList(page);

  return (
    <main className="max-w-screen-sm mx-auto py-20">
      <h1 className="text-center text-2xl">Tweet</h1>
      <div className="flex justify-between px-4">
        <div>
          {page !== 1 ?
            <Link href={`/?page=${page - 1}`}>
              <ArrowLeftIcon className="size-6" />
            </Link> : null
          }

        </div>
        <div>
          {page < Math.floor(count / 1) ? <Link href={`/?page=${page + 1}`}>
            <ArrowRightIcon className="size-6" />
          </Link> : null}
        </div>
      </div>
      <ul className="mt-1 border-b-0 border">
        {tweets?.map((item, index) => (
          <li key={item.id} >
            <Link href={`/${item.id}`} className="my-2 flex items-stretch px-4">
              <div className="w-6 flex items-center">
                {page + index}
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
