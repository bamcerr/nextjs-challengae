import { InputHTMLAttributes, ReactNode } from "react"


interface InputProps {
  icon?: React.ReactNode | null,
  errors?: string[]
}

export default function Input({ icon = null, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const Icon = () => { return icon }

  return <div className="relative w-full mt-4 px-2">
    <div className="left-6 w-4 h-12 absolute text-slate-500 flex items-center justify-center">
      {icon}
    </div>

    <input
      className={`
        w-full h-12 pl-10 py-1 rounded-full overflow-clip border border-slate-300 hover:ring-2 ring-offset-1 ring-slate-300 outline-none
        ${errors.length > 0 && 'ring-red-300 border-red-300'}
      `}
      {...rest}
    />

    <div className="mt-1">
      {errors.map((error, index) => <p key={index} className="text-red-400">{error}</p>)}
    </div>
  </div>
}