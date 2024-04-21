"use client";
import Link from "next/link";
import React from "react";
import { IconClock } from "@tabler/icons-react";
import CourseIcon from "./CourseIcon";
import { Card } from "@/app/components/Card";
import { formatSecondsToMinutes } from "@/utils/format-seconds";

interface LessonProps {
  className?: string;
  progress?: number;
  tag: string | null;
  title: string;
  description: string | null;
  courseId: string;
  duration?: number | null;
  id: string;
}

function Lesson({
  className,
  courseId,
  id,
  progress,
  tag,
  duration,
  title,
  description,
}: LessonProps) {
  const pp = `w-[${progress}%]`;
  return (
    <div className="mr-4 max-w-[100hh]">
      <Link href={`/watch/${courseId}/${id}`} className="mr-4 ">
        <Card.Root>
          <div className="flex p-2 gap-2">
            <Card.Body className="max-w-24 p-2 max-h-24 flex w-full items-center color-inherit subpixel-antialiased gap-3">
              <CourseIcon name={tag} />
            </Card.Body>
            <Card.Footer className=" flex dark:text-zinc-200 w-full items-center color-inherit subpixel-antialiased gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="text-left">
                    <span className=" line-clamp-1 text-sm text-zinc-950 dark:text-zinc-50">
                      {title}
                    </span>
                  </div>

                  <p className=" line-clamp-2 text-xs dark:text-zinc-400">
                    Este curso é um treinamento que visa ensinar os aspectos
                    básicos e avançados do Photoshop para pessoas que não têm
                    conhecimento prévio sobre o software de edição de imagens. O
                    curso aborda técnicas e práticas para criar e editar imagens
                    de alta qualidade. Além disso, o treinamento oferece
                    conhecimentos teóricos e práticos sobre os diferentes
                  </p>
                  <div className="flex gap-1">
                    <IconClock className="size-4 text-zinc-500 dark:text-zinc-400" />
                    <span className="text-xs">
                      {formatSecondsToMinutes(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </Card.Footer>
          </div>
        </Card.Root>
      </Link>
    </div>
  );
}

export default Lesson;
