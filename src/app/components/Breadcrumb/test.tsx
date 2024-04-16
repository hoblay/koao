"use client";
import { trpc } from "@/app/_trpc/client";
import {
  IconDots,
  IconChevronRight,
  IconAwardFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function Test({
  courseId,
  chapterId,
  lessonId,
}: {
  courseId: string;
  chapterId?: string;
  lessonId?: string;
}) {
  const course = trpc.course.getById.useQuery(courseId);
  let lesson;
  let chapter;
  if (chapterId) chapter = trpc.chapter.getById.useQuery(chapterId);
  if (lessonId) lesson = trpc.lesson.getById.useQuery(lessonId);
  return (
    <ol className="flex flex-wrap justify-center items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      {course.data && (
        <li className="inline-flex items-center gap-1.5">
          <Link
            href={`/teacher/${course.data.id}`}
            className={`  truncate overflow-ellipsis ${chapter?.data ? "max-w-64" : ""} `}
          >
            <span className="font-normal text-xl dark:hover:text-zinc-200">
              {course.data.title}
            </span>
          </Link>
        </li>
      )}

      {chapter?.data && !lesson?.data && (
        <li className="inline-flex items-center gap-1.5">
          <IconChevronRight className="w-4 h-4 mt-[3px]" />
          <Link
            href={`/teacher/${chapter.data.id}`}
            className={`  truncate overflow-ellipsis ${lesson?.data ? "max-w-64" : ""} `}
          >
            <span className="font-normal text-xl dark:hover:text-zinc-200">
              {chapter.data.title}
            </span>
          </Link>
        </li>
      )}
      {lesson?.data && (
        <>
          <li className="inline-flex items-center gap-1.5" aria-hidden="true">
            <IconChevronRight className="w-4 h-4 mt-[3px]" />
            <Link
              href={`/teacher/${course?.data?.id}/${chapter?.data?.id}`}
              className="max-w-52 flex truncate overflow-ellipsis"
            >
              <span className="flex h-9 w-9 items-center justify-center">
                <IconDots className="h-5 w-5 dark:hover:text-zinc-200" />
                <span className="sr-only">More</span>
              </span>
            </Link>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <IconChevronRight className="w-4 h-4 mt-[3px]" />
            <Link href={`/teacher/${lesson.data.id}`}>
              <span className="font-normal text-xl dark:hover:text-zinc-200">
                {lesson.data.title}
              </span>
            </Link>
          </li>
        </>
      )}
    </ol>
  );
}

export default Test;
