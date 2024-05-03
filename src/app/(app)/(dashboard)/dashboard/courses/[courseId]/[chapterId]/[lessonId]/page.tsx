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
import { deleteLesson } from "../upload/_components/actions";
import EditLesson from "./_components/EditLesson";
import { ChapterSidebar } from "../_components/ChapterSideBar";
import { LessonView } from "./_components/LessonView";

export default function Home({
  params,
}: {
  params: { courseId: string; chapterId: string; lessonId: string };
}) {
  const chapter = trpc.chapter.getById.useQuery(params.chapterId);
  const lesson = trpc.lesson.getById.useQuery(params.lessonId);

  if (!lesson.data || !chapter.data) return null;
  const removeLesson = async () => {
    const a = await deleteLesson(params.lessonId);
    chapter.refetch();
  };

  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <ChapterSidebar courseId={params.courseId} chapterId={params.chapterId} />
      <LessonView
        courseId={params.courseId}
        chapterId={params.chapterId}
        lessonId={params.lessonId}
      />
    </div>
  );
}
