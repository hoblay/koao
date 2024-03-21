"use client";
import { ReactNode } from "react";
import { useContext } from 'react';
import { SidebarContext } from "./SideBarRoot";

interface SideBarSectionProps{
  children: ReactNode,
  className?: string,
  first?: Boolean | false,
  title?: string,
}

export function SideBarSection({ children, className, first, title }:SideBarSectionProps) {
  let { open } = useContext(SidebarContext);
  return(
    <ul className={`space-y-2 font-medium ${className} ${!first ? "pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-700" : ""}`}>
      {title && (<span className={`px-4 text-sm text-zinc-500 dark:text-zinc-400 ${!open ? 'hidden': ''}`}>{title}</span>)}
      
      {children}
    </ul>
  );
}

