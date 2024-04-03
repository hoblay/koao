"use client";
import { ArrowLeftIcon, ChevronLeftIcon, HamburgerMenuIcon, WidthIcon } from "@radix-ui/react-icons";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { createContext, useContext } from 'react';
import LogoIcon from "../Icons/Logo";

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
    
    <div className={`md:h-[calc(100vh-40px)] sm:sticky absolute overscroll-x-none overscroll-y-none  ${className}`} onMouseEnter={() => handleHover()} onMouseLeave={() => hideButton()}>
      <button type="button" className="inline-flex items-center p-2 mt-2 text-sm rounded-lg ms-3 text-zinc-500 md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600">
          <span className="sr-only">Open sidebar</span>
          <HamburgerMenuIcon className='w-6 h-6' />
        </button>

        <aside className={`hidden md:block h-[calc(100vh-40px)] overscroll-x-none overscroll-y-none transition-all ease-in-out duration-300 ${open ? 'w-[216px]  ' : 'w-[76px]'}` }>

        <button className={` absolute -right-3 top-7 p-1 bg-[#00B37E] hover:bg-[#00875F] dark:bg-[#015F43] rounded-full shadow-sm dark:hover:bg-[#014430] dark:text-white ${isHidden ? 'hidden' : ''}`} onClick={shrinkBar}> <IconLayoutSidebarLeftExpand className="w-4 h-4"/></button>
          <div className="h-[calc(100vh-40px)] overscroll-x-none overscroll-y-none rounded-xl px-3 py-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
            {logo && (
              <Link href={"/"} className="flex p-2 mb-4 space-x-2 items-center">
                <div className=""><LogoIcon width="40" height="28" className="#015F43"/> </div>
                <span className={`p-1 text-lg font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap transition-[opacity] duration-75 ease-in ${!open ? 'opacity-0' : 'opacity-100' }`}>
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