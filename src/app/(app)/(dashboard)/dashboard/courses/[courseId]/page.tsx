"use client";
import { useSearchParams } from "next/navigation";
import { CourseSidebar } from "./_components/CourseSideBar";
import { CourseViews } from "./_components/CourseViews";
import { EditCourseView } from "./_components/EditCourseView";

export default function Home({ params }: { params: { courseId: string } }) {
  const searchParams = useSearchParams();

  const edit = searchParams.get("edit");
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 7, 5, 4, 3, 2, 4, 5, 62, 45, 6, 2, 2,
  ];
  if (edit) {
    return (
      <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
        <CourseSidebar course={params.courseId} />
        <EditCourseView course={params.courseId} />
      </div>
    );
  }
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <CourseSidebar course={params.courseId} />
      <CourseViews chapters={arr} course={params.courseId} />
    </div>
  );
}
