"use client";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  HamburgerMenuIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext, useContext } from "react";
import LogoIcon from "../Icons/Logo";
import { SideBarSection } from "./SideBarSection";
import { SideBarItem } from "./SideBarItem";
import { usePathname } from "next/navigation";

interface SideBarProps {
  children: ReactNode;
  className?: string;
}

interface SidebarContextProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export function SideBarRoot({ children, className }: SideBarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(pathname === "/dashboard");
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
  };

  const shrinkBar = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`md:h-[calc(100vh-78px)] sm:sticky absolute overscroll-x-none overscroll-y-none  ${className}`}
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => shrinkBar()}
    >
      <button
        type="button"
        className="inline-flex items-center p-2 text-sm rounded-lg ms-3 text-zinc-500 md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
      >
        <span className="sr-only">Open sidebar</span>
        <HamburgerMenuIcon className="w-6 h-6" />
      </button>

      <aside
        className={`hidden md:block h-[calc(100vh-78px)] overscroll-x-none overscroll-y-none transition-all ease-in-out duration-300 ${open ? "w-[200px]  " : "w-[62px]"}`}
      >
        <div className="relative h-[calc(100vh-78px)] overscroll-x-none overscroll-y-none px-2 overflow-y-auto bg-zinc-50 dark:bg-[#2d2d2d] border border-[#1f1f1f]/10 dark:border-[#363636]">
          <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
          </SidebarContext.Provider>
        </div>
      </aside>
    </div>
  );
}
