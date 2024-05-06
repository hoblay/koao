import Tooltip from "@/app/components/Tooltip/Tooltip";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import {
  IconCircleCheck,
  IconEye,
  IconPhotoVideo,
  IconPlayerPause,
  IconPlayerPauseFilled,
  IconPresentation,
  IconVideo,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { ClassContentChapterContext } from "./ClassContentChapter";
import { trpc } from "@/app/_trpc/client";

const lessonStyle = tv({
  base: " flex items-center justify-center p-1 rounded-lg -start-[13px] ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 text-[#015F43] dark:text-zinc-400   cursor-pointer transition-all duration-150 ease-in-out",
  variants: {
    active: {
      true: "ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 text-[#015F43] dark:text-zinc-200 ",
    },
    done: {
      true: "ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 text-[#015F43] dark:text-[#00B47E]  ",
    },
  },
  defaultVariants: {
    active: false,
    done: false,
  },
});
interface LessonProps {
  done: boolean;
  active: boolean;
  markAsActive: () => void;
  title: string;
  duration: number;
  courseId: string;
  lessonId: string;
}

export function ClassContentLesson({
  done,
  active,
  markAsActive,
  courseId,
  lessonId,
  duration,
  title,
}: LessonProps) {
  const [hover, setHover] = useState(false);
  const [isDone, setIsDone] = useState(done);
  const [isActive, setIsActive] = useState(active);
  const progressComplete = trpc.lesson.complete.useMutation();
  const context = useContext(ClassContentChapterContext);

  const complete = () => {
    if (!context) return null;
    context.markAsDone(lessonId);
    setIsDone(!isDone);
    progressComplete.mutate(
      { lessonId, isCompleted: isDone },
      {
        onSettled: () => {
          const updateProgress = trpc.course.getProgress.useQuery(courseId);
          updateProgress.refetch();
        },
      },
    );
  };

  const watch = () => {
    markAsActive();
    setIsActive(true);
  };

  return (
    <li
      className={`px-4 py-2.5 cursor:pointer  flex gap-2 w-full items-center justify-between text-zinc-600 rounded-md hover:bg-zinc-100 dark:hover:bg-[#363636] group ${done ? " " : ""}`}
    >
      <span
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={lessonStyle({
          active: isActive,
          done: isDone,
        })}
        onClick={() => complete()}
      >
        <Tooltip
          active={hover}
          message={isDone ? "Marcar como não visto" : "Marcar como visto"}
        >
          {!hover ? (
            <span className={`text-xs ${isActive && ""}`}>
              {isActive ? (
                <IconVideo className="size-5 " />
              ) : (
                <IconPresentation className="size-5" />
              )}
            </span>
          ) : (
            <span className={`text-xs ${isActive && ""}`}>
              <IconCircleCheck className="size-5" />
            </span>
          )}
        </Tooltip>
      </span>
      <Link href={`/watch/${courseId}/${lessonId}`} className="flex gap-2">
        <h3
          className={`${
            isDone
              ? "text-[#00B47E] hover:text-green-400"
              : isActive
                ? "text-zinc-900 dark:text-zinc-50  dark:hover:text-zinc-300"
                : "text-zinc-900 dark:text-zinc-400  dark:hover:text-zinc-300"
          }  max-w-[230px]  truncate text-start  text-[13px] `}
          onClick={() => watch()}
        >
          {title}
        </h3>
        <span className="text-zinc-400 pl-2">
          {formatSecondsToMinutes(duration)}
        </span>
      </Link>
    </li>
  );
}
