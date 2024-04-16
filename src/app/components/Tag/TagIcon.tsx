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

const IconStyle = tv({
  base: "w-5 h-5 text-zinc-500 dark:text-zinc-400",
});

interface TagIconProps {
  name?: string;
}

function TagIcon({ name }: TagIconProps) {
  if (!name) return null;
  return (
    <div>
      {name === "Produção musical" && (
        <div className="">
          <IconDeviceSpeaker className={IconStyle()} />
        </div>
      )}
      {name === "Culinaria" && (
        <div className="">
          <IconChefHat className={IconStyle()} />
        </div>
      )}
      {name === "Design" && (
        <div className="">
          <IconPalette className={IconStyle()} />
        </div>
      )}
      {name === "Programação" && (
        <div className="">
          <IconCode className={IconStyle()} />
        </div>
      )}
      {name === "Arte" && (
        <div className="">
          <IconBrush className={IconStyle()} />
        </div>
      )}
      {name === "Materia" && (
        <div className="">
          <IconNotebook className={IconStyle()} />
        </div>
      )}
      {name === "Colegas" && (
        <div className="">
          <IconUsers className={IconStyle()} />
        </div>
      )}
      {name === "Cursos" && (
        <div className="">
          <IconBooks className={IconStyle()} />
        </div>
      )}

      {name === "Mais" && (
        <div className="">
          <IconChevronDown className={IconStyle()} />
        </div>
      )}
    </div>
  );
}

export default TagIcon;
