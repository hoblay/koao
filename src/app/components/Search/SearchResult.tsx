import {
  ArchiveIcon,
  FileIcon,
  PlusIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { ElementType, ReactNode, useState } from "react";
import { useContext } from "react";
import { SearchContext } from "./SearchRoot";
import Avatar from "../Avatar/Avatar";

interface SearchResultProps {
  children?: ReactNode;
  className?: string;
  icon?: ElementType;
  name?: string;
  type: "file" | "user";
  user?: User;
}

interface User {
  name: string;
  email: string;
  image?: string;
}

export function SearchResult({
  children,
  className,
  icon: Icon,
  name,
  type,
  user,
}: SearchResultProps) {
  return (
    <>
      {type === "user" && (
        <div className="flex items-center space-x-2 relative p-2 rounded-md hover:bg-zinc-100 hover:cursor-pointer  dark:text-zinc-50 dark:bg-[#363636]/20 dark:hover:bg-[#1f1f1f]">
          <Avatar
            name={user?.name}
            image={user?.image}
            color="amber"
            size="xs"
          />
          <span className="text-sm text-zinc-700 dark:text-zinc-100">
            {user?.name}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 ">
            {user?.email}
          </span>
          <PlusIcon className="w-4 h-4 right-3 absolute" />
        </div>
      )}

      {type === "file" && (
        <div className="flex items-center space-x-2 relative px-4 py-3 rounded-md hover:bg-zinc-100 hover:cursor-pointer dark:text-zinc-50  dark:bg-[#363636]/20 dark:hover:bg-[#1f1f1f]">
          <FileIcon className=" w-4 h-4" />
          <span className="text-sm text-zinc-700 dark:text-zinc-100">
            {name}
          </span>
          <ResetIcon className="w-4 h-4 right-3 absolute" />
        </div>
      )}
    </>
  );
}
