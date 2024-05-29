"use client"
import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-screen-sm mx-auto py-20">
      <div className="flex justify-center items-center mb-20">
        <FireIcon className="text-red-500 w-20" />
      </div>

      <div className="flex flex-col p-2 gap-3">
        <Link
          className="rounded-full bg-slate-400 text-white p-3 text-center font-semibold"
          href={"/create-account"}
        >Go to Sign up</Link>
        <Link
          className="rounded-full bg-slate-400 text-white p-3 text-center font-semibold"
          href={"/log-in"}
        >Go to Log in</Link>
      </div>
    </main>);
}
