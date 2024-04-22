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
import Art from "./icons/Art";

const IconStyle = tv({
  base: "size-24 drop-shadow-2xl",
});

interface CourseIconProps {
  name?: string | null;
}

const Icon = {
  photoshop: <Photoshop className={IconStyle()} />,
  javascript: (
    <JavaScript className="size-20 drop-shadow-2xl rounded-xl overflow-hidden" />
  ),
  php: (
    <Php className="size-32 drop-shadow-2xl rounded-xl bg-indigo-400 p-4 max-h-[100%] overflow-hidden" />
  ),
  figma: (
    <Figma className="size-32 drop-shadow-2xl  rounded-xl bg-zinc-950 p-4 max-h-[100%] overflow-hidden" />
  ),
  nodejs: (
    <Nodejs className="size-32 drop-shadow-2xl  rounded-xl bg-[#0d121c] p-3 max-h-[100%] overflow-hidden" />
  ),
  mix: (
    <Flstudio className="size-32 drop-shadow-2xl  rounded-xl bg-indigo-950 p-3 max-h-[100%] overflow-hidden" />
  ),
  art: (
    <Art className="size-32 drop-shadow-2xl  rounded-xl bg-purple-950 p-4 max-h-[100%] overflow-hidden" />
  ),
};

function CourseIcon({ name }: CourseIconProps) {
  if (!name) return null;
  return <>{Icon[name as keyof typeof Icon]}</>;
}

export default CourseIcon;
