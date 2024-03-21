"use client";
import { ReactNode } from "react";
import { useContext } from 'react';
import { SearchContext } from "./SearchRoot";
import { PlusIcon } from "@radix-ui/react-icons";

interface SearchSectionProps{
  children: ReactNode,
  className?: string,
  title?: string,
}

export function SearchSection({ children, className, title }:SearchSectionProps) {
  let {isTyping } = useContext(SearchContext);
  return(
    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in ${!isTyping ? 'max-h-0' : 'max-h-96'}`}>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm p-4">{title}</span>
          <div className="py-2 flex-col p-2 space-y-1">
          
            {children}
          </div>
        </div>
  );
}

