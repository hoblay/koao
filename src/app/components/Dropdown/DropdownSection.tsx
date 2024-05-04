import { ReactNode } from "react";
import React from "react";
import { tv } from "tailwind-variants";

const dropdownSectionStyle = tv({
  base: "",
  variants: {
    active: {
      true: "",
    },
    done: {
      true: " ",
    },
  },
  defaultVariants: {
    active: false,
    done: false,
  },
});

interface DropdownSectionProps {
  children?: ReactNode[] | ReactNode;
  title?: string;
  showDivider?: boolean;
}

export default function DropdownSection({
  children,
  title,
  showDivider,
}: DropdownSectionProps) {
  return (
    <>
      {showDivider && (
        <li
          className="shrink-0 bg-zinc-300 dark:bg-zinc-800 border-none w-full h-[1px] my-1"
          role="separator"
        ></li>
      )}

      <li className="relative mb-2 flex flex-col gap-1">
        <span className="pl-1 text-xs text-zinc-600 dark:text-zinc-500">
          {title}
        </span>
        <ul className="flex flex-col gap-1">{children}</ul>
      </li>
    </>
  );
}
