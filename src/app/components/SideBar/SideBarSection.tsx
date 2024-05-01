"use client";
import { ReactNode } from "react";
import { useContext } from "react";
import { SidebarContext } from "./SideBarRoot";

interface SideBarSectionProps {
  children: ReactNode;
  className?: string;
  first?: Boolean | false;
  title?: string;
}

export function SideBarSection({
  children,
  className,
  first,
  title,
}: SideBarSectionProps) {
  const context = useContext(SidebarContext);
  if (!context) return null;
  return (
    <ul
      className={`flex flex-col gap-1 py-2  ${className} ${!first ? " border-t border-[#1f1f1f]/10 dark:border-[#363636]" : ""}`}
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
