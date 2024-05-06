"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const lesson = trpc.lesson.getById.useQuery(params.lessonId);
  const progress = trpc.lesson.enroll.useMutation();
  const enrolled = trpc.lesson.checkIfProgress.useQuery(params.lessonId);
  const progressComplete = trpc.lesson.complete.useMutation();
  const lastSeen = trpc.lesson.getLastWatch.useQuery();
  const userCourses = trpc.course.getLastWatch.useQuery();

  const getNextLesson = (lesson: any) => {
    if (lesson) {
      let nLesson = lesson;
      lesson.chapter.course.chapters.map((chapter: Chapter, i: number) => {
        chapter.lessons.map((lessonT, index) => {
          if (lesson.id === lessonT.id) {
            nLesson = chapter.lessons[index + 1]
              ? chapter.lessons[index + 1]
              : lesson.chapter.course.chapters[i + 1] &&
                lesson.chapter.course.chapters[i + 1].lessons[0];
          }
        });
      });
      return nLesson;
    }
  };
  const enroll = useCallback(() => {
    progress.mutate(params.lessonId, {
      onSettled: () => {
        lastSeen.refetch();
        userCourses.refetch();
      },
    });
  }, [lastSeen, params.lessonId, progress, userCourses]);
  useEffect(() => {
    if (!!enrolled.data === false) {
      enroll();
    }
    setMounted(true);
  }, [enrolled.data]);

  const nextLesson = () => {
    progressComplete.mutate(
      { lessonId: params.lessonId, isCompleted: true },
      {
        onSettled: () => {
          if (lesson.data) {
            const updateProgress = trpc.course.getProgress.useQuery(
              lesson.data.chapter.course.id,
            );
            updateProgress.refetch();
          }
        },
      },
    );
    if (lesson.data) {
      getNextLesson(lesson.data) &&
        router.push(
          `/watch/${lesson.data.chapter.course.id}/${getNextLesson(lesson.data).id}`,
        );
    }
  };

  return (
    <div className="">
      <div className="flex relative rounded-2xl bg-zinc-950 w-[883px] h-[496.6875px] overflow-hidden ">
        <ReactPlayer
          controls
          width={"100%"}
          onEnded={() => lesson.data && nextLesson()}
          className="absolute top-0 left-0"
          height={"100%"}
          playing
          url={
            lesson.data?.video?.commitUrl ? lesson.data?.video?.commitUrl : ""
          }
        />
      </div>

      <div className=" max-w-[883px]">
        <div className="flex flex-col gap-2 px-1 py-4">
          {lesson.data ? (
            <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
              {lesson.data?.title}
            </h4>
          ) : (
            <div className="h-6 bg-gray-300 rounded-lg dark:bg-[#363636] w-[600px] animate-pulse"></div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {lesson.data ? (
                <Avatar
                  name={lesson.data?.chapter.course.author.name}
                  color="green"
                  image={lesson.data?.chapter.course.author.image}
                />
              ) : (
                <div className="size-[46px] bg-gray-300 rounded-full dark:bg-[#363636] animate-pulse"></div>
              )}

              {lesson.data ? (
                <div className="flex flex-col align-center justify-center">
                  <span className="text-zinc-800 dark:text-zinc-100 text-sm">
                    {lesson.data?.chapter.course.author.name}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Educador na Kwenda
                  </span>
                </div>
              ) : (
                <div className="flex flex-col align-center justify-center gap-1">
                  <div className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-32 animate-pulse"></div>

                  <div className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-48 animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="flex">
              <Button onClick={nextLesson}>
                {getNextLesson(lesson.data)
                  ? "Proxima aula"
                  : "Finalizar curso"}
              </Button>
            </div>
          </div>
        </div>
        <Card.Root className="">
          <Card.Body className="p-4">
            <div className="flex flex-col gap-6 leading-[1.6]">
              <p>{lesson.data?.chapter.description}</p>
            </div>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  );
}
