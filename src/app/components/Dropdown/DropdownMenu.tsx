"use client";
import { ReactNode, useContext } from "react";
import React from 'react'
import { tv } from "tailwind-variants";
import { DropdownContext } from "./DropdownRoot";

const dropdownMenuStyle = tv({
  base: 'absolute right-0 mt-2 z-10 inline-flex flex-col items-center justify-center subpixel-antialiased outline-none box-border text-sm max-w-64 bg-zinc-50 dark:bg-zinc-900 rounded-lg shadow-md w-full p-1 min-w-[200px] transition-all duration-150 ease-in-out',
  variants: {
    variant: {
      solid: '',
      bordered: '',
      light: '',
      flat: '',
      faded: '',
      shadow: ''
    },
    open: {
      true: 'opacity-100',
      false: 'opacity-0 -z-40'
      
    },
  },
  defaultVariants: {
    open: false,
  }
});

interface DropdownMenuProps {
  children: ReactNode[] | ReactNode,
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow',
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger',
  className?: string

}

export default function DropdownMenu({children, variant, color, className}: DropdownMenuProps){
  let { isDropdownOpen } = useContext(DropdownContext);
  return (
    <div className={dropdownMenuStyle({open: isDropdownOpen, class: className})}>
      <div className="w-full relative flex flex-col gap-1 p-1">
        <ul className="w-full flex flex-col gap-0.5 outline-none">
          {children}
        </ul>
      </div>
    </div>
  )
}