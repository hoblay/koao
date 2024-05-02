import { ReactNode } from "react";
import { ChapterSidebar } from "./_components/ChapterSideBar";
import { ChapterViews } from "./_components/ChapterViews";

export default function Home({
  params,
  children,
}: {
  params: { courseId: string; chapterId: string };
  children: ReactNode | ReactNode[];
}) {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 7, 5, 4, 3, 2, 4, 5, 62, 45, 6, 2, 2,
  ];
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <ChapterSidebar course={params.courseId} chapter={params.chapterId} />
      <ChapterViews course={params.courseId} chapter={params.chapterId}>
        {children}
      </ChapterViews>
    </div>
  );
}
