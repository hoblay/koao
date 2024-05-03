"use client";
import { useSearchParams } from "next/navigation";
import { CourseSidebar } from "./_components/CourseSideBar";
import { CourseViews } from "./_components/CourseViews";
import { EditCourseView } from "./_components/EditCourseView";
import { trpc } from "@/app/_trpc/client";

export default function Home({ params }: { params: { courseId: string } }) {
  const searchParams = useSearchParams();

  const edit = searchParams.get("edit");
  const course = trpc.course.getById.useQuery(params.courseId);
  if (!course.data) return null;
  if (edit) {
    return (
      <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
        <CourseSidebar courseId={params.courseId} />
        <EditCourseView courseId={params.courseId} />
      </div>
    );
  }
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <CourseSidebar courseId={params.courseId} />
      <CourseViews chapters={course.data.chapters} courseId={params.courseId} />
    </div>
  );
}
