"use client";
import { ReactNode } from "react";
import { useContext } from "react";
import { SidebarContext } from "./SideBarRoot";

interface SideBarSectionProps {
  children: ReactNode;
  className?: string;
  first?: boolean;
  title?: string;
  warning?: boolean;
}

export function SideBarSection({
  children,
  className,
  first,
  title,
  warning,
}: SideBarSectionProps) {
  const context = useContext(SidebarContext);
  if (!context) return null;
  return (
    <ul
      className={`${!context.open && warning ? "opacity-0" : "opacity-100 transition-opacity ease-in-out duration-1000"}  flex flex-col gap-1 py-2  ${className} ${!first && !warning ? " border-t border-[#1f1f1f]/10 dark:border-[#363636]" : ""}`}
    >
      {title && (
        <span
          className={`px-4 text-sm text-zinc-500 dark:text-zinc-400 ${!context.open ? "opacity-0 hidden" : "opacity-100"}`}
        >
          {title}
        </span>
      )}

      {children}
    </ul>
  );
}
