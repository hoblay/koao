"use client";
import Link from "next/link";
import React from "react";
import { IconClock, IconNotebook, IconPresentation } from "@tabler/icons-react";
import Image from "next/image";
import { Card } from "@/app/components/Card";

interface CourseProps {
  className?: string;
  progress?: number;
  img: string;
  name: string;
  price: number | 0;
  modules: number;
  category: string;
  description: string | null;
  id: string;
}

function Course({
  className,
  id,
  progress,
  img,
  name,
  price,
  modules,
  description,
  category,
}: CourseProps) {
  const pp = `w-[${progress}%]`;
  return (
    <div className="mr-4">
      <Link href={`/course/${id}`} className="mr-4 ">
        <Card.Root rounded="none" bg={false} shadow="none">
          <Card.Header className="">
            <Image
              src={img}
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
              <div className="text-left">
                <span className=" font-semibold text-xs uppercase dark:text-zinc-400">
                  {category}
                </span>
                <span className=" line-clamp-1 text-sm text-zinc-950 dark:text-zinc-50">
                  {name}
                </span>
              </div>

              <p className=" line-clamp-3 text-xs dark:text-zinc-400">
                {description}
              </p>
            </div>
          </Card.Body>
          <Card.Footer className="py-1 h-auto flex dark:text-zinc-200 w-full items-center color-inherit subpixel-antialiased gap-3">
            <div className="flex gap-1 items-center ">
              <div className="flex gap-1">
                <IconNotebook className="size-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs ">{modules} Modulos ·</span>
              </div>
              <div className="flex gap-1">
                <IconPresentation className="size-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs ">{modules} Aulas ·</span>
              </div>
              <div className="flex gap-1">
                <IconClock className="size-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs"> 5 horas</span>
              </div>
            </div>
          </Card.Footer>
        </Card.Root>
      </Link>
    </div>
  );
}

export default Course;
