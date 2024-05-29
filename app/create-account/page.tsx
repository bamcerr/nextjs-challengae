"use client"
import Input from "@/components/Input";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, IdentificationIcon, KeyIcon, MegaphoneIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { FireIcon } from "@heroicons/react/24/solid";
import createAccount from "./actions";
import { useFormState } from "react-dom";
import Button from "@/components/button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

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
            type="text"
            name="username"
            icon={<UserCircleIcon />}
            placeholder="Username"
            autoComplete="username"
            errors={state?.erros?.fieldErrors.username}
          />
          <Input
            type="text"
            name="bio"
            icon={<IdentificationIcon />}
            placeholder="Biography"
            autoComplete="bio"
            errors={state?.erros?.fieldErrors.bio}
          />
          <Input
            type="password"
            name="password"
            icon={<KeyIcon />}
            placeholder="Password"
            autoComplete="new-password"
            errors={state?.erros?.fieldErrors.password}
          />
          <Input
            type="password"
            name="confirmPassword"
            icon={<KeyIcon />}
            placeholder="Confirm password"
            autoComplete="new-password"
            errors={state?.erros?.fieldErrors.confirmPassword}
          />
        </div>

        <div className="mt-2 px-2">
          <Button>Sign Up</Button>
        </div>

        {/* {state?.success && <div className="mt-2 mx-2 bg-green-600 h-14 flex items-center font-bold rounded-xl">
          <CheckBadgeIcon className="w-6 mr-5 ml-5" /> Welcom back!
        </div>} */}
      </form>
    </main>
  )
}