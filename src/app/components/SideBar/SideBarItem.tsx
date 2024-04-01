"use client"
import Link from "next/link";
import { ElementType, ReactNode, useState } from "react";
import { useContext } from 'react';
import { SidebarContext } from "./SideBarRoot";
import { IconChevronDown } from "@tabler/icons-react";
import { tv } from "tailwind-variants";

const SidebarItemStyle = tv({
  base: '',
  variants: {
    
  },
  defaultVariants: {
    
  }
});
 


interface SideBarItemProps{
  children?: ReactNode,
  className?: string,
  parent?: boolean | false,
  icon?: ElementType,
  title: string,
  href?: string
}

export function SideBarItem({ children, className, parent, icon: Icon, title, href }:SideBarItemProps) {
  const [isOpen, setisOpen] = useState<boolean>(false);

  let { open, setOpen } = useContext(SidebarContext);

  const handleClick = () => {
    setisOpen(!isOpen);
    setOpen(true);
  };


  return(
    
    <>
      <li className={` mt-2 ${className}`}>
        <Link href={href || "#"} className={`flex space-x-2 w-full items-center justify-between py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 group transition-all duration-75 ease-in-out ${open ? '': ''} ${!parent && !Icon? 'pl-9' : ''} ${isOpen && parent && open ? ' text-purple-500 dark:bg-purple-700 bg-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800': ''}`} onClick={() => handleClick()}>
          {Icon && (
            <Icon className={` flex-shrink-0 w-5 h-5  transition duration-75 ${isOpen && parent && open ? 'text-purple-500 group-hover:text-purple-500 dark:group-hover:text-zinc-100 dark:text-zinc-50':'text-zinc-500  group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white'}`}/>
          )}
          <span className={`flex-1 text-left rtl:text-right whitespace-nowrap ${!open ? 'hidden': ''} ${isOpen && parent && open ? 'text-purple-600 group-hover:text-purple-700 dark:group-hover:text-zinc-100 dark:text-zinc-50':''}`} >{title}</span>
          {(parent && open) && (
            <div className="flex">
              <IconChevronDown className={`w-5 h-5  transition-all transform duration-300 ${isOpen ? "rotate-180 text-purple-500 group-hover:text-purple-500 dark:group-hover:text-zinc-100 dark:text-zinc-50" : ""}`}/>
            </div>
          )}
        </Link> 
        {parent &&  (
          <ul className={`overflow-hidden space-y-2 transition-[max-height] duration-300 ease-in-out ${isOpen && open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          {children} 
          </ul>
      )}
      </li>
      
      
    </>
  );
}
