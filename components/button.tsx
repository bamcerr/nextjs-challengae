import { useFormStatus } from "react-dom"

interface ButtonProps {
  children?: React.ReactNode,
  full?: boolean
}

export default function Button({ children, full = true, ...rest }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()

  return (
    <button
      {...rest}
      className={`
        ${full ? 'w-full' : ""}
        ${pending && 'text-gray-400'}
        bg-gray-200 h-12 mt-4 rounded-full font-bold hover:bg-gray-300 
          box-border px-5
          transition-all
      `}
    >
      {pending ? 'Loading...' : children}
    </button>
  )
}