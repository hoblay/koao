import { Accordion } from "@/app/components/Accordion";

import { formatSecondsToMinutes } from "@/utils/format-seconds";
import { IconPlayerPause } from "@tabler/icons-react";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { tv } from "tailwind-variants";

const moduleCircle = tv({
  base: " w-9 h-9 rounded-xl font-bold p-1 border-2 border-[#1f1f1f]/10 dark:border-[#363636] text-zinc-600 dark:text-zinc-200 bg-zinc-100 dark:bg-[#2a2a2a] items-center justify-center",
  variants: {
    active: {
      true: "border-[#015F43] text-[#015F43]  dark:text-zinc-100 dark:border-[#015F43]",
    },
    done: {
      true: "border-[#015F43] text-[#015F43] dark:text-zinc-100  dark:border-[#015F43] ",
    },
  },
  defaultVariants: {
    active: false,
    done: false,
  },
});
interface ChapterProps {
  active: boolean;
  title: string;
  position: number;
  duration: number;
  nLessons: number;
  children: ReactNode | ReactNode[];
  dones: string[];
}
interface ClassContentChapterContextProps {
  markAsDone: (id: string) => void;
}

export const ClassContentChapterContext =
  createContext<ClassContentChapterContextProps | null>(null);
export function ClassContentChapter({
  active,
  duration,
  title,
  position,
  nLessons,
  children,
  dones: lessonsDone,
}: ChapterProps) {
  const [isDone, setIsDone] = useState(false);
  const [isActive, setIsActive] = useState(active);
  const [dones, setDones] = useState<string[]>(lessonsDone);
  const markAsDone = (id: string) => {
    // adds it to the array if there's no lesson of the same module done

    let dd = [];
    if (!(dones.findIndex((lessonId) => lessonId === id) !== -1)) {
      dd = [...dones, id];
    } else {
      // if there's a lesson of the same module done
      dd = [...dones.filter((lessonId) => lessonId !== id)];
    }

    setDones([...dd]);
  };
  useEffect(() => {
    dones.length === nLessons ? setIsDone(true) : setIsDone(false);
  }, [dones, nLessons]);
  return (
    <Accordion.Item
      className="py-8 px-3 bg-zinc-100 dark:bg-[#313131] rounded-lg hover:dark:bg-[#363636] overflow-x-visible"
      startContent={
        <div
          className={moduleCircle({
            active: isActive,
            done: isDone,
          })}
        >
          <div className="flex items-center text-center justify-center">
            {isActive ? <IconPlayerPause className="m-1 w-4 h-4" /> : position}
          </div>
        </div>
      }
      subtitle={`${nLessons} Aulas · ${formatSecondsToMinutes(duration)} ${isDone ? "· Completado" : `· ${dones.length}/${nLessons}`}`}
      index={position}
      title={title}
    >
      <div className="py-1 px-0">
        <ol className="relative flex flex-col gap-0.5">
          <ClassContentChapterContext.Provider value={{ markAsDone }}>
            {children}
          </ClassContentChapterContext.Provider>
        </ol>
      </div>
    </Accordion.Item>
  );
}
