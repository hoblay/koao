"use client";
import { IconCalendarMonth, IconLockSquareRoundedFilled, IconMailFilled, IconSignature } from "@tabler/icons-react";
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
          : 
            <div className="relative inline-flex w-full items-center h-full box-border">
              {props.type === 'email' && <IconMailFilled  className="absolute top-[15px] left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0"/>}
              {props.name === 'name' && <IconSignature  className="absolute top-[15px] left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0"/>}
              {(props.type === 'password') && <IconLockSquareRoundedFilled  className="absolute top-[15px] left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0"/>}
              
              <input id={props.name}  {...register(props.name)} 
              {...props}
                className={`w-full max-w-[384px] font-normal relative flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-950/40 dark:focus:bg-zinc-950/40 h-[53px] min-h-12 rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none  data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100 ${props.type !== 'date' && 'pl-[44px]'} justify-between`} />
            </div>
        }
  
    </>
    
  )
}
