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
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <ChapterSidebar courseId={params.courseId} chapterId={params.chapterId} />
      <ChapterViews courseId={params.courseId} chapterId={params.chapterId}>
        {children}
      </ChapterViews>
    </div>
  );
}
