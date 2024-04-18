"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Card } from "@/app/components/Card";
import Link from "next/link";
import ReactPlayer from "react-player";

type Chapter = {
  id: string;
  title: string;
  description: string | null;
  courseId: string;
  position: number;
  isPublished: boolean;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  chapterId: string;
  createdAt: Date;
  updatedAt: Date;
};
export default function ClassPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lesson = trpc.lesson.getById.useQuery(params.lessonId);
  if (!lesson.data) {
    return null;
  }
  const getNextLesson = (lesson: any) => {
    let nLesson = lesson;
    lesson.chapter.course.chapters.map((chapter: Chapter) => {
      chapter.lessons.map((lessonT, index) => {
        if (lesson.id === lessonT.id) {
          nLesson = chapter.lessons[index + 1];
        }
      });
    });
    return nLesson;
  };

  return (
    <div className="">
      <div className="flex relative rounded-2xl bg-zinc-950 min-w-[853px] min-h-[480px] overflow-hidden ">
        <ReactPlayer
          controls
          width={"100%"}
          className="absolute top-0 left-0"
          height={"100%"}
          autoPlay
          url={lesson.data.video?.commitUrl ? lesson.data.video?.commitUrl : ""}
          config={{}}
        />
      </div>

      <div className=" max-w-[853px]">
        <div className="flex flex-col gap-2 px-2 py-4">
          <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
            {lesson.data.title}
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Avatar
                name={lesson.data.chapter.course.author.name}
                color="green"
                image={lesson.data.chapter.course.author.image}
              />
              <div className="flex flex-col align-center justify-center">
                <span className="text-zinc-800 dark:text-zinc-100 text-sm">
                  {lesson.data.chapter.course.author.name}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Instrutor na Kwenda
                </span>
              </div>
            </div>
            <div className="flex">
              <Link
                href={`/watch/${lesson.data.chapter.course.id}/${getNextLesson(lesson.data).id}`}
              >
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43] hover:bg-[#143229] text-white px-4 py-2 text-sm"
                >
                  <div className="flex flex-1 justify-center items-center gap-2">
                    <span className="text-base leading-6">Proxima aula</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Card.Root className="">
          <Card.Body className="p-4">
            <div className="flex flex-col gap-6 leading-[1.6]">
              <p>{lesson.data.chapter.description}</p>
            </div>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  );
}
