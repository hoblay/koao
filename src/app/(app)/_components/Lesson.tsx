"use client";
import Link from "next/link";
import React from "react";
import { IconClock, IconDots, IconShare } from "@tabler/icons-react";
import CourseIcon from "./CourseIcon";
import { Card } from "@/app/components/Card";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import Image from "next/image";
import { Dropdown } from "@/app/components/Dropdown";

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
    <div className="mr-4 max-w-[100hh] pb-4">
      <Card.Root rounded="none" bg={false} shadow="none">
        <Link href={`/watch/${courseId}/${id}`}>
          <Card.Header className="relative max-h-[182px]">
            <Image
              src={courseImage}
              className="object-cover rounded-xl w-full md:max-h-[182.812px] h-[100%]"
              alt="course"
              width={311}
              height={182.812}
              style={{ objectFit: "cover" }}
              unoptimized
            />

            <div className="absolute group bg-transparent flex inset-0 w-full h-full  cursor-pointer hover:bg-[#1f1f1f]/40 rounded-xl items-center justify-center">
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <button className="z-50 absolute -bottom-[60px] -right-28 opacity-0 p-1 group-hover:opacity-100 rounded-xl bg-[#363636]/80 hover:bg-[#015f43]">
                    <IconDots className="size-5" />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Menu className="top-14 left-24">
                  <Dropdown.Section>
                    <Dropdown.Item
                      title="Compartilhar"
                      description={"Partilhe a aula com os seus amigos."}
                      startContent={<IconShare className="text-zinc-600" />}
                    />
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Root>
            </div>
          </Card.Header>
        </Link>
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
    </div>
  );
}

export default Lesson;
