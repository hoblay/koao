
import { ArchiveIcon, FileIcon, PlusIcon, ResetIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ElementType, ReactNode, useState } from "react";
import { useContext } from 'react';
import { SearchContext } from "./SearchRoot";

interface SearchResultProps{
  children?: ReactNode,
  className?: string,
  icon?: ElementType,
  name?: string,
  type: "file" | "user",
  user?: User
}

interface User{
  name: string,
  email: string
}

export function SearchResult({ children, className, icon: Icon, name, type, user }:SearchResultProps) {


  return(
    <>
      {(type === "user" && (
        <div className="flex items-center space-x-2 relative p-2 rounded-xl hover:bg-zinc-100 hover:cursor-pointer  dark:text-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
          <span className="bg-zinc-300 w-7 h-7 rounded-full dark:bg-zinc-700"></span>
          <span className="text-sm text-zinc-700 dark:text-zinc-100">{user?.name}</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 ">{user?.email}</span>
          <PlusIcon className="w-4 h-4 right-3 absolute"/>
        </div>
      ))}

      {(type === "file" && (
        <div className="flex items-center space-x-2 relative px-4 py-3 rounded-xl hover:bg-zinc-100 hover:cursor-pointer dark:text-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
          <FileIcon className=" w-4 h-4"/>
          <span className="text-sm text-zinc-700 dark:text-zinc-100">{name}</span>
          <ResetIcon className="w-4 h-4 right-3 absolute"/>
        </div>
 
      ))}

</>

  );
}
