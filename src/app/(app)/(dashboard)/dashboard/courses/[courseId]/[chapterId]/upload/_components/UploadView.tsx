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

export function UploadView({
  courseId,
  chapterId,
  children,
}: {
  courseId: string;
  chapterId: string;
  children: ReactNode | ReactNode[];
}) {
  const pathname = usePathname();
  const course = trpc.course.getById.useQuery(courseId);
  const chapter = trpc.chapter.getById.useQuery(chapterId);

  if (!course.data || !chapter.data) return null;
  return (
    <div className="flex flex-col pl-[256px]">
      <header
        className={`${pathname === `/dashboard/courses/${courseId}/${chapterId}/upload` || pathname === `/dashboard/courses/${courseId}/${chapterId}` ? "py-2" : "py-4"} w-full max-w-[1116px]  fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t px-4   border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]`}
      >
        <div className="flex justify-between  ">
          <Breadcrumb.RootA>
            <Breadcrumb.Item
              first
              href="/dashboard"
              title="Painel de controle"
            />
            <Breadcrumb.Item href="/dashboard/courses" title="Cursos" />
            <Breadcrumb.Item
              href={`/dashboard/courses/${courseId}`}
              short
              title={`${course.data.title}`}
            />
            <Breadcrumb.Item
              href={`/dashboard/courses/${courseId}/${chapterId}`}
              title={`${chapter.data.title}`}
            />
          </Breadcrumb.RootA>
          <div className="flex gap-2">
            {pathname ===
              `/dashboard/courses/${courseId}/${chapterId}/upload` && (
              <>
                <button>
                  <Tag
                    name="Apagar tudo"
                    startContent={
                      <IconCircleMinus className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                    }
                  />
                </button>
                <Link href={`/dashboard/courses/${courseId}/${chapterId}`}>
                  <button disabled>
                    <Tag
                      name="Adicionar tudo"
                      startContent={
                        <IconUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                      }
                    />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="relative rounded-lg pt-[49px] w-full ">{children}</div>
    </div>
  );
}
