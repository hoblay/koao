import { IconMailFilled } from '@tabler/icons-react'
import React from 'react'

export const Input = () => {
  return (

    <div className="relative inline-flex w-full items-center h-full box-border">
      <input className={`w-full font-normal relative max-w-[350px] flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 h-10 min-h-12 rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none  data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100`} />
    </div>
)
}

