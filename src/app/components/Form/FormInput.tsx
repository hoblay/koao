import { InputHTMLAttributes, ReactNode } from "react";
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  children?: ReactNode | ReactNode[],
}

export function FormInput(props: InputProps) {
  const { register } = useFormContext()

  return (
    <>
      { props.type === "select" ?
          <select id={props.name} {...register(props.name)} className="flex-1 rounded border border-zinc-300 dark:border-zinc-800 shadow-sm px-3 py-2 text-zinc-800 dark:text-zinc-300 focus:outline-none focus:ring-0">
            {props.children}
          </select> 
          : <input 
              id={props.name}
              className="flex-1 rounded border border-zinc-300 dark:border-zinc-800 shadow-sm px-3 py-2 text-zinc-800 dark:text-zinc-300 focus:outline-none focus:ring-0"
              {...register(props.name)} 
              {...props}
            />
        }
  
    </>
    
  )
}