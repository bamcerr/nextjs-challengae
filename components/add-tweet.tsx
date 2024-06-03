"use client";
import { addTweet } from "@/app/(home)/actions";
import Input from "./Input";
import Button from "./button";
import { useFormState } from "react-dom";
import React, { useEffect, useRef } from "react";

export default function AddTweet() {
  const [state, action] = useFormState(addTweet, null);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log('c')
    ref?.current?.reset()
  }, [state?.data])

  return (
    <div>
      <form action={action} ref={ref}>
        <Input
          name="tweet"
          placeholder="Add Tweet"
          minLength={2}
          errors={state?.error?.fieldErrors.tweet}
        />

        <div className="px-2 flex justify-end">
          <Button full={false}>Add</Button>
        </div>
      </form>
    </div>
  )
}