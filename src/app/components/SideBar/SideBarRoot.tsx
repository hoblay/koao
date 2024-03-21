"use client";
import { ArrowLeftIcon, ChevronLeftIcon, HamburgerMenuIcon, WidthIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { createContext, useContext } from 'react';

interface SideBarProps{
  children: ReactNode,
  className?: string,
  logo?: Boolean | false,
  brand?: string,
}



export const SidebarContext = createContext({});

export function SideBarRoot({ children, className, logo, brand }:SideBarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleHover = () => {
    setOpen(true);

    setIsHidden(!isHidden);
  };
  
  const handleLeave = () => {
    setOpen(false);
  };

  const hideButton = () => {
    setIsHidden(true);
  }

  const shrinkBar = () => {
    setOpen(!open);
  }
  

  return(
    
    <div className={`h-full  ${className}`} onMouseEnter={() => handleHover()} onMouseLeave={() => hideButton()}>
      <button type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-zinc-500 rounded-lg sm:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600">
          <span className="sr-only">Open sidebar</span>
          <HamburgerMenuIcon className='w-6 h-6' />
        </button>

        <aside className={` h-screen transition-all ease-in-out duration-300 ${open ? 'w-[216px]  ' : 'w-[76px]'}` }>

        <button className={` absolute -right-3 top-7 p-1 bg-purple-300 hover:bg-purple-400 dark:bg-purple-700 rounded-full shadow-sm dark:hover:bg-purple-800 dark:text-white ${isHidden ? 'hidden' : ''}`} onClick={shrinkBar}> <ChevronLeftIcon className="w-4 h-4"/></button>
          <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
            {logo && (
              <Link href={"/"} className="p-2 flex space-x-2 mb-4">
                <span className=" bg-zinc-200 dark:bg-zinc-700 w-9 h-9 rounded-2xl p-[18px]" > </span>
                <span className={`p-1 text-lg font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap ${!open ? 'hidden' : '' }`}>
                  {brand}
                </span>
              </Link>
            )}
            
            <SidebarContext.Provider value={{ open, setOpen }}>
              {children}
            </SidebarContext.Provider>
          </div>
        </aside>
      
    </div>
  );
}