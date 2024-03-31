
import React from 'react'
import { tv } from 'tailwind-variants';

const AvatarStyle= tv({
  base: 'inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full  select-none cursor-pointer',
  variants: {
    color:{
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500',
      green: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
      zinc: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800/30 dark:text-zinc-500',
      emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-500',
      
    },
    done: {
      true: ' '
    }
  },
  defaultVariants: {
    color: 'purple',
    done: false
  }
});


interface AvatarProps{
  user?: User
}

interface User{
  name: string,
  email: string,
  img?: string,
}

function Prova({ user }:AvatarProps) {
  return (
    <span className={AvatarStyle({color: 'purple'})}>
      WM
    </span>

  )
}

export default Prova
