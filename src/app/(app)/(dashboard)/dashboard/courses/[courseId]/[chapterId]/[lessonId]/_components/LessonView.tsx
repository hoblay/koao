"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";

import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";

import {
  IconBookOff,
  IconCircleMinus,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconEditCircle,
  IconExclamationCircle,
  IconEye,
  IconLayoutGrid,
  IconPresentation,
  IconTable,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import { formatBytes } from "@/utils/format-bytes";
import EditLesson from "./EditLesson";
import { deleteLesson } from "../../upload/_components/actions";

export function LessonView({
  courseId,
  chapterId,
  lessonId,
}: {
  courseId: string;
  chapterId: string;
  lessonId: string;
}) {
  const pathname = usePathname();
  const course = trpc.course.getById.useQuery(courseId);
  const chapter = trpc.chapter.getById.useQuery(chapterId);
  const lesson = trpc.lesson.getById.useQuery(lessonId);

  const removeLesson = async (id: string) => {
    const a = await deleteLesson(id);
    chapter.refetch();
  };
  if (!course.data || !chapter.data || !lesson.data) return null;
  return (
    <div className="flex flex-col pl-[256px]">
      <header
        className={`py-2 w-full max-w-[1116px]  fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t px-4   border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]`}
      >
        <div className="flex justify-between  ">
          <Breadcrumb.RootA>
            <Breadcrumb.Item
              first
              href="/dashboard/"
              title="Painel de controle"
            />
            <Breadcrumb.Item href="/dashboard/courses" title="..." />
            <Breadcrumb.Item
              href={`/dashboard/courses/${courseId}`}
              short
              title={`...`}
            />
            <Breadcrumb.Item
              short
              href={`/dashboard/courses/${courseId}/${chapterId}`}
              title={`${chapter.data.title}`}
            />
            <Breadcrumb.Item
              href={`/dashboard/courses/${courseId}/${chapterId}/${lessonId}`}
              title={`${lesson.data.title}`}
            />
          </Breadcrumb.RootA>
          <div className="flex gap-2 pr-4">
            <button disabled>
              <Tag
                name="Adicionar mudanças"
                startContent={
                  <IconEditCircle className="text-zinc-500 w-5 h-5" />
                }
              />
            </button>
          </div>
        </div>
      </header>

      <div className="relative rounded-lg pt-[68px] w-full ">
        <div className="relative rounded-lg w-full p-4 flex flex-col">
          <div className="flex p-8 justify-between min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
            <EditLesson lessonId={lessonId} edit={true} />
            <video
              disablePictureInPicture
              src={lesson.data.video?.commitUrl || ""}
              className="rounded-xl object-cover min-h-[310px] max-h-[310px]"
              width={546}
              height={310}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
