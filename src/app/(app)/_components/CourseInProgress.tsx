"use client";
import Link from "next/link";
import React from "react";
import { IconNotebook, IconPresentation } from "@tabler/icons-react";
import CourseIcon from "./CourseIcon";
import { Card } from "@/app/components/Card";
import { trpc } from "@/app/_trpc/client";
import { formatSecondsToHours } from "@/utils/format-hours";

interface CourseProps {
  className?: string;
  img: string;
  name: string;
  price: number | 0;
  modules: number;
  tag: string;
  description: string | null;
  id: string;
}

function CourseInProgress({
  className,
  id,
  img,
  name,
  price,
  modules,
  description,
  tag,
}: CourseProps) {
  const progress = trpc.course.getProgress.useQuery(id);
  let pp: number | any = 0;
  if (progress.data) {
    pp = progress.data;
  }

  return (
    <div className="mr-4 max-w-[100hh]">
      <Link href={`/course/${id}`} className="mr-4 ">
        <Card.Root className="h-[112px] border border-[#1f1f1f]/10 dark:border-[#363636] dark:bg-[#363636]/60">
          <div className="flex p-2 items-center">
            <Card.Body className="max-w-24 p-1.5 max-h-24  rounded-xl overflow-hidden flex w-full items-center color-inherit subpixel-antialiased gap-3 shadow-none ">
              <CourseIcon name={tag} />
            </Card.Body>
            <Card.Footer className=" px-2 flex dark:text-zinc-200 w-full items-center color-inherit subpixel-antialiased gap-3">
              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="text-left">
                    <span className=" line-clamp-1 text-sm text-zinc-950 dark:text-zinc-50">
                      {name}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex gap-1 items-center max-h-[32px]">
                      <div className="flex gap-1">
                        <IconNotebook className="size-4 text-zinc-400" />
                        <span className="text-xs ">{modules} Modulos ·</span>
                      </div>
                      <div className="flex gap-1">
                        <IconPresentation className="size-4 text-zinc-400" />
                        <span className="text-xs ">{pp.nlessons} Aulas</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full gap-1 justify-between items-center">
                    <div
                      className={` w-full bg-zinc-200 rounded dark:bg-[#1f1f1f] my-2`}
                    >
                      <div
                        className={`bg-emerald-300 dark:bg-[#015F43] text-xs font-medium text-[#015F43] dark:text-zinc-100 text-center leading-none rounded whitespace-nowrap transition-[width] duration-300 ease-in-out`}
                        style={{ width: `${pp.progress}%` }}
                      >
                        {Math.round(pp.progress)}% Completado
                      </div>
                    </div>
                    <div className="flex gap-1 px-2">
                      <span className="text-xs text-nowrap">
                        {formatSecondsToHours(pp.duration)}
                      </span>
                    </div>
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

export default CourseInProgress;
