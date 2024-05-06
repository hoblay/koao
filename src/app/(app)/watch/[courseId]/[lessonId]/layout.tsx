import { serverClient } from "@/app/_trpc/serverClient";
import { Card } from "@/app/components/Card";
import { IconNotebook } from "@tabler/icons-react";
import ClassContent from "./_components/ClassContent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/server/auth";
type Lesson = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  chapterId: string;
  chapter?: any;
  video: any;
  createdAt: Date;
  updatedAt: Date;
};
type Chapter = {
  id: string;
  title: string;
  description: string | null;
  courseId: string;
  position: number;
  isPublished: boolean;
  lessons: Lesson[];
};
export default async function ClassLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string; lessonId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  const course = await serverClient.course.getById(params.courseId);
  const progress = await serverClient.course.getProgress(params.courseId);
  let pp: any = 0;
  if (progress) {
    pp = progress.progress;
  }
  const lesson = await serverClient.lesson.getById(params.lessonId);
  if (!course || !lesson) {
    return null;
  }
  const getNextLesson = (lesson: Lesson) => {
    let nLesson = lesson;
    course.chapters.map((chapter, i) => {
      chapter.lessons.map((lessonT, index) => {
        if (lesson.id === lessonT.id) {
          nLesson = chapter.lessons[index + 1]
            ? chapter.lessons[index + 1]
            : course.chapters[i + 1] && course.chapters[i + 1].lessons[0];
        }
      });
    });
    return nLesson;
  };
  return (
    <div className="relative flex gap-6 px-16 py-24 pb-8">
      <main className="w-full min-w-[883px]">{children}</main>
      <aside className=" md:flex flex-col gap-4 overscroll-y-none overscroll-x-none max-w-[510px] max-h-[594px]">
        <ClassContent
          course={course}
          nextLesson={getNextLesson(lesson)}
          lesson={lesson}
          chapterPosition={lesson.chapter.position}
          progress={pp}
        />
        <Card.Root className="">
          <Card.Header>
            <div className="py-4 px-4 flex gap-3 items-center">
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-[#2b2b2b]">
                <IconNotebook />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base">Material da aula</h3>
                <span className="text-base text-zinc-400">
                  Baixe pra complementar a aula
                </span>
              </div>
            </div>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card.Root>
      </aside>
    </div>
  );
}
