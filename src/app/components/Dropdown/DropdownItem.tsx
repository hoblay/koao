import Link from "next/link";
import React from 'react'
import { ReactNode, HTMLAttributeAnchorTarget } from "react";
import { tv } from "tailwind-variants";

const dropdownItemStyle = tv({
  base: '',
  variants: {
    active: {
      true: '',
      
    },
    done: {
      true: ' '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});

interface DropdownItemProps{
  children?:	ReactNode,
  title?: string | ReactNode,
  description?: 	string | ReactNode,
  shortcut?: string | ReactNode,
  startContent?: ReactNode,
  endContent?: ReactNode,
  href?: string,
  target?: HTMLAttributeAnchorTarget,
  isDisabled?: boolean,
  onClick?: () => void,


}

export default function DropdownItem({children, title, description, shortcut, startContent, endContent, href, target, isDisabled, onClick}:DropdownItemProps) {
  return (
    <Link href={`${href ? href : '#' }`} target={target} className="flex gap-3" onClick={onClick}>
    <li className="flex group gap-3 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-lg subpixel-antialiased cursor-pointer outline-none border-[2px] border-transparent hover:border-zinc-200  dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:transition-colors hover:text-default-foreground">
      
        { startContent && 
          <div className='dark:text-zinc-400 dark:group-hover:text-zinc-50 text-xl pointer-events-none flex-shrink-0'>
            {startContent}
          </div>
        }
        <div className="w-full flex-1 flex flex-col items-start justify-center">
          <span className="flex-1 text-sm truncate text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-50">{title}</span>
          <span className="w-full text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-100 truncate">{description}</span>
        </div>

        { endContent && endContent }
        {shortcut && 
          <div className="">
            <kbd className="  px-1 py-0.5 rounded-md font-sans text-zinc-700 dark:text-zinc-500 text-xs bg-purple-300 dark:bg-zinc-800 group-hover:bg-purple-300 dark:group-hover:bg-zinc-400 group-hover:text-zinc-800">⌘T</kbd>
          </div>
        }
        
      
    </li>
    </Link>
  )
}