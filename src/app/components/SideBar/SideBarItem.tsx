
import { ChevronDownIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ElementType, ReactNode, useState } from "react";
import { useContext } from 'react';
import { SidebarContext } from "./SideBarRoot";

interface SideBarItemProps{
  children?: ReactNode,
  className?: string,
  parent?: boolean | false,
  icon?: ElementType,
  title: string
}

export function SideBarItem({ children, className, parent, icon: Icon, title, }:SideBarItemProps) {
  const [isOpen, setisOpen] = useState<boolean>(false);

  let { open, setOpen } = useContext(SidebarContext);

  const handleClick = () => {
    setisOpen(!isOpen);
    setOpen(true);
  };


  return(
    
    <>
      <li className={` mt-2 ${className}`}>
        <Link href="#" className={`flex items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 group transition-all duration-75 ease-in-out ${open ? '': ''} ${!parent && !Icon? 'pl-9' : ''} ${isOpen && parent && open ? ' text-purple-500 dark:bg-purple-700 bg-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800': ''}`} onClick={() => handleClick()}>
          {Icon && (
            <Icon className={` flex-shrink-0 w-5 h-5 text-zinc-500 transition duration-75 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white ${isOpen && parent && open ? 'text-purple-900 group-hover:text-purple-900 dark:group-hover:text-zinc-100 dark:text-zinc-50':''}`}/>
          )}
          <span className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ${!open ? 'hidden': ''} ${isOpen && parent && open ? 'text-purple-600 group-hover:text-purple-700 dark:group-hover:text-zinc-100 dark:text-zinc-50':''}`} >{title}</span>
          {parent && (
            <ChevronDownIcon className={`w-4 h-4 ${!open ? 'hidden': ''}`} />
          )}
        </Link>
        {parent &&  (
          <ul className={`overflow-hidden space-y-2 transition-[max-height] duration-300 ease-in-out ${isOpen && open ? 'max-h-40' : 'max-h-0'}`}>
          {children} 
          </ul>
      )}
      </li>
      
      
    </>
  );
}
