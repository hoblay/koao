import React, { ReactNode } from "react";
import { tv } from "tailwind-variants";
import TagIcon from "./TagIcon";

const TagStyle = tv({
  base: "relative flex gap-1.5 select-none items-center whitespace-nowrap rounded-md  p-2 text-xs cursor-pointer dark:text-zinc-100",
  variants: {
    color: {
      base: "bg-zinc-400/10 dark:bg-[#363636] hover:bg-zinc-500/10 hover:dark:bg-zinc-400/10  text-zinc-900",
      success:
        "bg-emerald-200 dark:bg-emerald-950 hover:bg-emerald-300 hover:dark:bg-emerald-900  text-emerald-900 ",
      warning:
        "bg-amber-200 dark:bg-yellow-950 hover:bg-amber-300 hover:dark:bg-yellow-900  text-amber-900 ",
      danger:
        "bg-red-200 dark:bg-red-950 hover:bg-red-300 hover:dark:bg-red-900  text-red-900 ",
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
