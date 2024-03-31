import { IconMailFilled } from '@tabler/icons-react'
import React from 'react'

export const Input = () => {
  return (
    <div data-focus={true} className="focus:z-10 focus:ring-2 focus:ring-focus focus:ring-offset-2 
    focus:ring-offset-background group ">
      
    <div className="relative inline-flex w-full items-center h-full box-border">
      <IconMailFilled className="absolute top-3 left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0"/>
      <input placeholder="example@email.com" type='email'
        className="w-full font-normal relative max-w-[350px] flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 h-10 min-h-12 rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none pl-[44px] data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100" />
    </div>
    
    
    
  </div>
  )
}

