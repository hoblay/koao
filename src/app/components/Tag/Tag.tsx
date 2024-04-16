import {
  IconDeviceSpeaker,
  IconChefHat,
  IconPalette,
  IconCode,
  IconBrush,
  IconBooks,
  IconNotebook,
  IconUsers,
  IconChevronDown,
} from "@tabler/icons-react";
import React, { ReactNode } from "react";
import { tv } from "tailwind-variants";

const TagStyle = tv({
  base: "relative flex gap-1.5 select-none items-center whitespace-nowrap rounded-lg  py-1.5 px-2 text-xs cursor-pointer dark:text-zinc-100",
  variants: {
    color: {
      base: "bg-zinc-400/10 dark:bg-zinc-100/10 hover:bg-zinc-500/10 hover:dark:bg-zinc-400/10  text-zinc-900",
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
      {name === "Produção musical" && (
        <div className="">
          <IconDeviceSpeaker className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Culinaria" && (
        <div className="">
          <IconChefHat className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Design" && (
        <div className="">
          <IconPalette className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Programação" && (
        <div className="">
          <IconCode className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Arte" && (
        <div className="">
          <IconBrush className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Materia" && (
        <div className="">
          <IconNotebook className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Colegas" && (
        <div className="">
          <IconUsers className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
      {name === "Cursos" && (
        <div className="">
          <IconBooks className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}

      <span className="">{name}</span>
      {name === "Mais" && (
        <div className="">
          <IconChevronDown className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      )}
    </div>
  );
}

export default Tag;
