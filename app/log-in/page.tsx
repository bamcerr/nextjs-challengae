"use client"
import Input from "@/components/Input";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { FireIcon } from "@heroicons/react/24/solid";
import login from "./actions";
import { useFormState } from "react-dom";
import Button from "@/components/button";

export default function LogIn() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <main className="max-w-screen-sm mx-auto py-20">

      <div className="flex justify-center items-center mb-20">
        <FireIcon className="text-red-500 w-20" />
      </div>

      <form action={dispatch}>
        <div>
          <Input
            type="email"
            name="email"
            icon={<EnvelopeIcon />}
            placeholder="Email"
            errors={state?.erros?.fieldErrors.email}
          />
          <Input
            type="password"
            name="password"
            icon={<KeyIcon />}
            placeholder="Password"
            autoComplete="current-password"
            errors={state?.erros?.fieldErrors.password}
          />
        </div>

        <div className="mt-2 px-2">
          <Button>Log in</Button>
        </div>

        {state?.success && <div className="mt-2 mx-2 bg-green-600 h-14 flex items-center font-bold rounded-xl">
          <CheckBadgeIcon className="w-6 mr-5 ml-5" /> Welcom back!
        </div>}
      </form>
    </main>
  )
}