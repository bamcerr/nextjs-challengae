import { useFormStatus } from "react-dom"


export default function Button({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return <button className={`w-full bg-gray-200 h-12 mt-4 rounded-full font-bold hover:bg-gray-300 ${pending && 'text-gray-400'}`}>
    {pending ? 'Loading...' : children}
  </button>
}