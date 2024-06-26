"use client";
import Link from "next/link";
import { ElementType, ReactNode, useState } from "react";
import { useContext } from "react";
import { SidebarContext } from "./SideBarRoot";
import { IconChevronDown } from "@tabler/icons-react";
import { tv } from "tailwind-variants";

const SidebarItemStyle = tv({
  base: "",
  variants: {},
  defaultVariants: {},
});

interface SideBarItemProps {
  children?: ReactNode;
  className?: string;
  parent?: boolean | false;
  icon?: ElementType;
  title: string;
  href?: string;
  onClick?: any;
  active?: boolean;
}

export function SideBarItem({
  children,
  className,
  parent,
  onClick,
  active,
  icon: Icon,
  title,
  href,
}: SideBarItemProps) {
  const [isOpen, setisOpen] = useState<boolean>(false);

  const context = useContext(SidebarContext);
  if (!context) return null;

  const handleClick = () => {
    setisOpen(!isOpen);
    context.setOpen(true);
  };

  return (
    <>
      <li className={` ${className}`}>
        <Link
          href={href || "#"}
          className={`${active && "bg-zinc-100 dark:bg-[#363636] dark:text-white"} flex gap-2 w-full items-center justify-between p-3 text-zinc-600 rounded-md dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#363636] group transition-all duration-75 ease-in-out ${context.open ? "" : ""} ${!parent && !Icon ? "pl-9" : ""} ${isOpen && parent && context.open ? " text-[#015F43] dark:bg-[#183b30] bg-[#015F43]/10 hover:bg-[#015F43]/15 dark:hover:bg-[#16332a]" : ""}`}
          onClick={() => handleClick()}
        >
          {Icon && (
            <Icon
              className={`${active ? "dark:text-white" : "dark:text-zinc-400"} flex-shrink-0 size-5  transition duration-75  group-hover:text-zinc-900  dark:group-hover:text-white`}
            />
          )}
          <span
            className={`${active ? "dark:text-white" : "dark:text-zinc-300"} flex-1 text-left rtl:text-right text-sm whitespace-nowrap ${!context.open ? "hidden" : ""} ${isOpen && parent && context.open ? "text-[#015F43] group-hover:text-[#015F43] dark:group-hover:text-zinc-100 dark:text-zinc-50" : ""}`}
          >
            {title}
          </span>
          {parent && context.open && (
            <div className="flex">
              <IconChevronDown
                className={`w-5 h-5  transition-all transform duration-300 ${isOpen ? "rotate-180 text-[#015F43] group-hover:text-[#015F43] dark:group-hover:text-zinc-100 dark:text-zinc-50" : ""}`}
              />
            </div>
          )}
        </Link>
        {parent && (
          <ul
            className={`overflow-hidden flex flex-col gap-2 transition-[max-height] duration-300 ease-in-out ${isOpen && context.open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {children}
          </ul>
        )}
      </li>
    </>
  );
}
