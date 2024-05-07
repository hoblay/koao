import { serverClient } from "@/app/_trpc/serverClient";
import { Card } from "@/app/components/Card";
import {
  IconBooks,
  IconFileTypePdf,
  IconFiles,
  IconNotebook,
} from "@tabler/icons-react";
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
      <aside className=" md:flex flex-col gap-4 overscroll-y-none overscroll-x-none max-w-[510px]">
        <ClassContent
          course={course}
          nextLesson={getNextLesson(lesson)}
          lesson={lesson}
          chapterPosition={lesson.chapter.position}
          progress={pp}
        />
        <Card.Root className="border-[#1f1f1f]/10 dark:border-[#363636] border p-1.5 gap-1 flex flex-col bg-zinc-100 dark:bg-[#313131] ">
          <Card.Header className="bg-zinc-50 dark:bg-[#363636]/60 rounded-lg border-[#1f1f1f]/10  dark:border-[#363636]">
            <div className="py-4 px-4 flex gap-3 items-center">
              <div className="p-3 rounded-xl font-bold border-2 border-[#1f1f1f]/10 dark:border-[#363636] text-zinc-600 dark:text-zinc-200 bg-zinc-100 dark:bg-[#2a2a2a] items-center justify-center">
                <IconBooks />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base">Material da aula</h3>
                <span className="text-base text-zinc-400">
                  Baixe pra complementar a aula
                </span>
              </div>
            </div>
          </Card.Header>
          <Card.Body
            className={`px-2 py-2 rounded-lg border border-[#1f1f1f]/10 dark:border-[#363636]  rounded-b-xl  overscroll-x-none overscroll-y-none no-scrollbar flex flex-col gap-2`}
          >
            <div className="w-full gap-3 outline-none px-2 py-0 rounded-lg h-14 flex items-center text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-[#363636]  group font-normal text-medium cursor-pointer">
              <div className="w-9 h-9 rounded-xl font-bold p-1 border-2 border-[#1f1f1f]/10 dark:border-[#363636] text-zinc-600 dark:text-zinc-200 bg-zinc-100 dark:bg-[#2a2a2a] items-center justify-center">
                <div className="flex items-center text-center justify-center">
                  <IconFileTypePdf className="m-1 w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between pr-1">
                <div className={`   flex  gap-2 w-[210px] max-w-[80%]`}>
                  <h3 className=" truncate text-sm ">Guia da aula</h3>
                </div>
                <span className="flex  text-sm pl-3 truncate text-zinc-400">
                  Ficheiro PDF
                </span>
              </div>
            </div>
            <div className="w-full gap-3 outline-none px-2 py-0 rounded-lg h-14 flex items-center text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-[#363636]  group font-normal text-medium cursor-pointer">
              <div className="w-9 h-9 rounded-xl font-bold p-1 border-2 border-[#1f1f1f]/10 dark:border-[#363636] text-zinc-600 dark:text-zinc-200 bg-zinc-100 dark:bg-[#2a2a2a] items-center justify-center">
                <div className="flex items-center text-center justify-center">
                  <IconFileTypePdf className="m-1 w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between pr-1">
                <div className={`   flex  gap-2 w-[210px] max-w-[80%]`}>
                  <h3 className=" truncate text-sm ">
                    Apontamentos do professor
                  </h3>
                </div>
                <span className="flex  text-sm pl-3 truncate text-zinc-400">
                  Ficheiro PDF
                </span>
              </div>
            </div>
          </Card.Body>
        </Card.Root>
      </aside>
    </div>
  );
}
