"use client";
import Link from "next/link";
import React from "react";
import { IconClock } from "@tabler/icons-react";
import CourseIcon from "./CourseIcon";
import { Card } from "@/app/components/Card";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import Image from "next/image";

interface LessonProps {
  className?: string;
  progress?: number;
  tag?: string | null;
  title: string;
  category?: string;
  description: string | null;
  courseId?: string | null;
  courseImage: string;
  duration?: number | null;
  id: string;
  index: number;
}

function Lesson({
  className,
  category,
  courseId,
  courseImage,
  id,
  index,
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
        <Card.Root rounded="none" bg={false}>
          <Card.Header className="">
            <Image
              src={courseImage}
              className="object-cover rounded-xl w-full md:max-h-[182.812px] h-[100%]"
              alt="course"
              width={311}
              height={182.812}
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </Card.Header>
          <Card.Body className="py-1 h-auto flex w-full items-center color-inherit subpixel-antialiased gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-left flex gap-3 justify-center items-center">
                <span className="text-5xl   font-bold text-zinc-700 dark:text-zinc-300">
                  {index}
                </span>
                <div>
                  <span className=" line-clamp-1 text-sm text-zinc-950 dark:text-zinc-50">
                    {title}
                  </span>
                  <span className=" line-clamp-1 text-sm text-zinc-500 dark:text-zinc-400">
                    2024 · {category}
                  </span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card.Root>
      </Link>
    </div>
  );
}

export default Lesson;
