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
import React from "react";
import { tv } from "tailwind-variants";

const IconStyle = tv({
  base: "w-5 h-5 text-zinc-500 dark:text-zinc-400",
});

interface TagIconProps {
  name?: string;
}

const Icon = {
  "Produção musical": <IconDeviceSpeaker className={IconStyle()} />,
  Culinaria: <IconChefHat className={IconStyle()} />,
  Design: <IconPalette className={IconStyle()} />,
  Programação: <IconCode className={IconStyle()} />,
  Arte: <IconBrush className={IconStyle()} />,
  Materia: <IconNotebook className={IconStyle()} />,
  Colegas: <IconUsers className={IconStyle()} />,
  Cursos: <IconBooks className={IconStyle()} />,
  Mais: <IconChevronDown className={IconStyle()} />,
};

function TagIcon({ name }: TagIconProps) {
  if (!name) return null;
  return <>{Icon[name]}</>;
}

export default TagIcon;
