"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";
import { Modal } from "@/app/components/Modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  IconDeviceFloppy,
  IconDots,
  IconMessageReport,
} from "@tabler/icons-react";
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

  const [opened, { open, close }] = useDisclosure();

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
    <>
      <div className="">
        {lesson.data?.video?.commitUrl ? (
          <div className="flex relative rounded-2xl bg-zinc-950 w-[883px] h-[496.6875px] overflow-hidden ">
            <ReactPlayer
              controls
              width={"100%"}
              onEnded={() => lesson.data && nextLesson()}
              className="absolute top-0 left-0"
              height={"100%"}
              playing
              url={lesson.data.video.commitUrl}
            />
          </div>
        ) : (
          <div className="flex relative rounded-2xl bg-zinc-950 w-[883px] h-[496.6875px] overflow-hidden "></div>
        )}

        <div className=" max-w-[883px]">
          <div className="flex flex-col gap-2 px-1 py-4">
            {lesson.data ? (
              <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
                {lesson.data?.title}
              </h4>
            ) : (
              <span className="h-6 bg-gray-300 rounded-lg dark:bg-[#363636] w-[600px] animate-pulse"></span>
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
                  <span className="size-[46px] bg-gray-300 rounded-full dark:bg-[#363636] animate-pulse"></span>
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
                    <span className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-32 animate-pulse"></span>

                    <span className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-48 animate-pulse"></span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button onClick={nextLesson} size="sm">
                  {getNextLesson(lesson.data)
                    ? "Proxima aula"
                    : "Finalizar curso"}
                </Button>
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <button className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]">
                      <IconDots />
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu>
                    <Dropdown.Section>
                      <Dropdown.Item
                        title="Guardar"
                        description={"Guarde para mais tarde"}
                        startContent={
                          <IconDeviceFloppy className="text-zinc-600" />
                        }
                      />
                      <Dropdown.Item
                        title="Reportar"
                        description={"Aperte para reportar"}
                        onClick={open}
                        startContent={
                          <IconMessageReport className="text-red-500" />
                        }
                      />
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown.Root>
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
      <Modal.Root isOpen={opened} onClose={() => close()}>
        <Modal.Content className="h-full p-0 justify-center items-center">
          <IconMessageReport className="size-8 text-red-600 absolute top-6 left-[200px]" />
          <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-3">
            <div className="flex flex-col gap-4 pt-4 relative">
              <h2 className="text-2xl font-semibold">O quê que aconteceu?</h2>
              <textarea
                name="Error"
                placeholder="Nos conte o que aconteceu..."
                className=" min-h-[158px]  p-2.5 justify-between w-full font-normal relative flex items-center gap-3 dark:bg-[#363636] border border-[#1f1f1f]/10 dark:border-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f]   rounded-md  motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100 box-border shadow-sm transition-all focus-visible:shadow-md focus:ring-[#363636] focus:ring-[1px] focus-visible:ring-background-control  group border-control"
              />
              <Button fullWidth size="lg">
                <span className="text-base">Reportar</span>
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
