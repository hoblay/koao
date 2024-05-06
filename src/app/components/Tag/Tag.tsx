import React, { ReactNode } from "react";
import { tv } from "tailwind-variants";
import TagIcon from "./TagIcon";

const TagStyle = tv({
  base: "group relative flex gap-2 select-none items-center whitespace-nowrap rounded-md  px-[10px] py-1.5 text-xs cursor-pointer dark:text-zinc-100",
  variants: {
    color: {
      base: "bg-[#363636]/10 text-zinc-500 dark:bg-[#363636]/60 border border-[#1f1f1f]/10 dark:border-[#363636] hover:bg-[#363636]/20 hover:dark:bg-[#2d2d2d] hover:text-[#363636] dark:hover:text-white dark:text-zinc-400",
      success:
        "bg-emerald-100 dark:bg-emerald-950/20 border border-emerald-500/20 hover:bg-emerald-400 hover:dark:bg-emerald-900/20 hover:text-white dark:hover:text-emerald-300 text-emerald-500 dark:text-emerald-500",
      warning:
        "bg-amber-100 dark:bg-amber-950/20 border border-amber-500/20 hover:bg-amber-400 hover:dark:bg-amber-900/20 hover:text-white dark:hover:text-amber-300 text-amber-500 dark:text-amber-500",
      danger:
        "bg-red-100 dark:bg-red-950/20 border border-red-500/20 hover:bg-red-400 hover:dark:bg-red-900/20 hover:text-white dark:hover:text-red-300 text-red-500 dark:text-red-500",
    },
  },
  defaultVariants: {
    color: "base",
  },
});

interface TagProps {
  name?: string;
  startContent?: ReactNode;
  className?: string;
  color?: "success" | "base" | "warning" | "danger";
}

function Tag({ name, startContent, className, color }: TagProps) {
  return (
    <div className={TagStyle({ color, class: className })}>
      {startContent && <div className="h-5 w-5">{startContent}</div>}
      {name !== "Mais" && <TagIcon name={name} />}

      <span className="">{name}</span>
      {name === "Mais" && <TagIcon name={name} />}
    </div>
  );
}

export default Tag;
