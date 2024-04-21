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
import Photoshop from "./icons/Photoshop";
import JavaScript from "./icons/Javascript";
import Php from "./icons/php";
import Figma from "./icons/Figma";
import Nodejs from "./icons/Nodejs";
import Flstudio from "./icons/Flstudio";

const IconStyle = tv({
  base: "size-32 drop-shadow-2xl",
});

interface CourseIconProps {
  name?: string | null;
}

const Icon = {
  photoshop: <Photoshop className={IconStyle()} />,
  javascript: <JavaScript className={IconStyle()} />,
  php: <Php className={IconStyle()} />,
  figma: <Figma className={IconStyle()} />,
  nodejs: <Nodejs className={IconStyle()} />,
  mix: <Flstudio className={IconStyle()} />,
};

function CourseIcon({ name }: CourseIconProps) {
  if (!name) return null;
  return <>{Icon[name as keyof typeof Icon]}</>;
}

export default CourseIcon;
