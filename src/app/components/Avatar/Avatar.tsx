
import { IconUserCircle, IconUserFilled } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react'
import { tv } from 'tailwind-variants';

const AvatarStyle= tv({
  base: 'inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full  select-none cursor-pointer',
  variants: {
    color:{
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500',
      green: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500',
      emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-500',
      pink: 'bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-500',
      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-500',
      
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
  initials?: string,
  image?: string,
  color?: "purple" | "green" | "emerald" | "orange" | "pink" | "blue" | "amber"
}



function Avatar({ initials ,image, color}:AvatarProps) {

 

  
  if(image){ 
    return <Image src={image} className=' object-cover rounded-full cursor-pointer hover:opacity-95' width={42} height={42} unoptimized  alt="Avatar"/>
  }
  return (
    <span className={AvatarStyle({color: color})}>
      { initials !== 'sebago' ? initials?.toUpperCase(): <IconUserFilled className={'z-2 text-purple-800 dark:text-white rounded-full w-6 h-6'}/>} 
    </span>

  )
}

export default Avatar
