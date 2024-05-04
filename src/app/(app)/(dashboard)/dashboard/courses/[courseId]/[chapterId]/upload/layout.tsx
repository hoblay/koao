"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import Button from "@/app/components/Button/Button";
import { Dropdown } from "@/app/components/Dropdown";
import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";
import { formatBytes } from "@/utils/format-bytes";
import { formatSecondsToMinutes } from "@/utils/format-seconds";

import {
  IconBookOff,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconExclamationCircle,
  IconEye,
  IconPresentation,
  IconTrash,
} from "@tabler/icons-react";

import Link from "next/link";
import { ChapterSidebar } from "../_components/ChapterSideBar";
import { UploadView } from "./_components/UploadView";
import { ReactNode } from "react";

export default function Layout({
  params,
  children,
}: {
  params: { courseId: string; chapterId: string };
  children: ReactNode | ReactNode[];
}) {
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <ChapterSidebar courseId={params.courseId} chapterId={params.chapterId} />
      <UploadView courseId={params.courseId} chapterId={params.chapterId}>
        {children}
      </UploadView>
    </div>
  );
}
