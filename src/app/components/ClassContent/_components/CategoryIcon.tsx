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
  base: "",
});

interface CategoryIconProps {
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

function CategoryIcon({ name }: CategoryIconProps) {
  if (!name) return null;
  return <>{Icon[name as keyof typeof Icon]}</>;
}

export default CategoryIcon;
