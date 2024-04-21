"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { ReactNode, useContext } from "react";
import { tv } from "tailwind-variants";
import { AccordionContext } from "./AccordionRoot";

interface AccordionItemProps {
  children?: ReactNode;
  index: number;
  title: ReactNode | string;
  subtitle?: ReactNode | string;
  startContent?: ReactNode;
  isDisabled?: boolean;
}

const Item = tv({
  base: "w-full gap-3 outline-none px-2 py-0 rounded-lg h-14 flex items-center text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-[#1f1f1f]/20  group font-normal text-medium cursor-pointer",
  variants: {
    isDisabled: {
      true: "",
    },
    active: {
      true: "bg-zinc-200/50 dark:bg-[#1f1f1f]/20 dark:text-zinc-200",
    },
  },
  defaultVariants: {
    isDisabled: false,
    active: false,
  },
});

function AccordionItem({
  children,
  index,
  title,
  subtitle,
  startContent: StartContent,
  isDisabled,
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) return null;

  return (
    <div>
      <h2>
        <button
          className={Item({ active: context.indexopen === index })}
          onClick={() => context.onClick(index)}
        >
          <div className="flex-shrink-0">{StartContent && StartContent}</div>
          <div className="flex-1 flex flex-col text-start">
            <span className="line-clamp-2">{title}</span>
          </div>
          <div className="">
            <ChevronLeftIcon
              className={` w-5 h-5 transition-all transform duration-300 ${context.indexopen === index ? "-rotate-90" : ""}`}
            />
          </div>
        </button>
      </h2>
      <section
        className={`overflow-y-hidden will-change-auto transition-all duration-500 ease-in-out   ${context.indexopen === index ? " max-h-[1000px] opacity-100" : " max-h-0 opacity-0"}`}
      >
        <div className="text-sm">{children}</div>
      </section>
    </div>
  );
}

export default AccordionItem;
