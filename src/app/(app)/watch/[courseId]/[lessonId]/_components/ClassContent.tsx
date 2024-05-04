"use client";

import React, { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import Link from "next/link";

import {
  IconChevronDown,
  IconEye,
  IconPlayerPause,
  IconPresentation,
  IconX,
} from "@tabler/icons-react";
import { Accordion } from "@/app/components/Accordion";
import CategoryIcon from "./CategoryIcon";
import { trpc } from "@/app/_trpc/client";
import { formatSecondsToMinutes } from "@/utils/format-seconds";

const moduleCircle = tv({
  base: " w-9 h-9 rounded-xl font-bold p-1 border-2 border-[#1f1f1f]/10 dark:border-[#363636] text-zinc-600 dark:text-zinc-200 bg-zinc-100 dark:bg-[#2a2a2a] items-center justify-center",
  variants: {
    active: {
      true: "border-[#015F43] text-[#015F43]  dark:text-zinc-100 dark:border-[#015F43]",
    },
    done: {
      true: "border-[#015F43] text-[#015F43] dark:text-zinc-100  dark:border-[#015F43] ",
    },
  },
  defaultVariants: {
    active: false,
    done: false,
  },
});

const lessonStyle = tv({
  base: " flex items-center justify-center p-1 rounded-lg -start-[13px] ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 text-[#015F43] dark:text-zinc-400   cursor-pointer transition-all duration-150 ease-in-out",
  variants: {
    active: {
      true: "ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 text-[#015F43] dark:text-zinc-200 ",
    },
    done: {
      true: "ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 text-[#015F43] dark:text-green-500  ",
    },
  },
  defaultVariants: {
    active: false,
    done: false,
  },
});

interface LessonsDoneProps {
  index?: number;
  name?: string;
  lessons: { name?: string }[] | number[];
}

type Course = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  category: Category | null;
  imageUrl: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  chapters: Chapter[];
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

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  video: any;
  chapterId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

function ClassContent({
  course,
  progress,
  nextLesson,
  lesson: currentLesson,
  chapterPosition,
}: {
  course: Course;
  progress: number;
  nextLesson: Lesson;
  lesson: Lesson;
  chapterPosition: number;
}) {
  const [open, setOpen] = useState(true);
  const [coursePercentage, setCoursePercentage] = useState<number>(progress);
  const [lessonsDone, setLessonsDone] = useState<
    { index: number; lessons: number[] }[]
  >([]);
  const [indexActive, setIndexActive] = useState<number>(chapterPosition - 1);
  const [lesseonIndexActive, setlessonIndexActive] = useState<number>(
    currentLesson.position - 1,
  );

  const numberOfLessons = (chapters: Chapter[]) => {
    let nLessons = 0;
    chapters.map((chapter) => {
      chapter.lessons.map(() => {
        nLessons++;
      });
    });
    return nLessons;
  };

  /* TODO: Make the container scrooll to the lesson when clicked */
  const listItems = useRef(null);

  const markAsActive = (indexParent: number, indexLesson: number) => {
    //Mark the module as active
    setIndexActive((prev) => (indexParent === prev ? prev : indexParent));

    indexParent === indexActive
      ? setlessonIndexActive(
          indexLesson === lesseonIndexActive ? indexLesson : indexLesson,
        )
      : setlessonIndexActive(
          indexLesson === lesseonIndexActive ? indexLesson : indexLesson,
        );
  };

  const markAsDone = (lesson: { index: number; lessons: number[] }) => {
    // adds it to the array if there's no lesson of the same module done
    !(lessonsDone.findIndex((item) => item.index === lesson.index) !== -1)
      ? setLessonsDone([...lessonsDone, lesson])
      : // if there's a lesson of the same module done
        lessonsDone.forEach((element, index) => {
          // if the lesson belongs to the same module
          if (element.index === lesson.index) {
            const deletedIndex = element.lessons.findIndex(
              (item) => item === lesson.lessons[0],
            );

            // removes it from the array if the lesson already exists
            if (deletedIndex > -1) {
              let filteredLessons = element.lessons.filter(
                (value, i: number) => i !== deletedIndex,
              );
              lessonsDone[index].lessons = [...filteredLessons];

              setLessonsDone([...lessonsDone]);
            }

            // ads it to the array if the lesson doesn't exist
            else {
              lessonsDone[index].lessons = [
                ...lessonsDone[index].lessons,
                lesson.lessons[0],
              ];
              setLessonsDone([...lessonsDone]);
            }
          }
        });
  };

  const checkDoneModule = (courseModule: Chapter, index: number) => {
    return (
      !!lessonsDone.find((el) => el.index === index) &&
      lessonsDone.find((ol) => ol.index === index)?.lessons.length ===
        courseModule.lessons.length
    );
  };

  const checkDoneLesson = (
    parentIndex: number,
    index: number,
    lessonId: string,
  ) => {
    let lessonModule = lessonsDone.find((item) => item.index === parentIndex);
    const done = trpc.lesson.checkDone.useQuery(lessonId);

    return !!done.data;
  };

  const lessonsNumber = Object.keys(course.chapters).length;

  const getChapterDuration = (chapter: Chapter) => {
    let duration = 0;
    chapter.lessons.map((lesson) => {
      duration = lesson.video.duration + duration;
    });
    return duration;
  };

  useEffect(() => {
    let percentagePerModule = 100 / lessonsNumber;

    let percentagePerLesson;

    let finalPercentage = 0;

    lessonsDone.forEach((lessonModule) => {
      course.chapters.forEach((chapter) => {
        if (lessonModule.index === chapter.position) {
          percentagePerLesson =
            (percentagePerModule / chapter.lessons.length) *
            lessonModule.lessons.length;
          finalPercentage = finalPercentage + percentagePerLesson;
        }
      });
    });
  }, [lessonsDone, lessonsNumber, course.chapters]);

  return (
    <div
      className={`${open ? "h-[480px] max-h-[480px]" : "max-h-[116px]"} transition-[max-height] duration-150 ease-in-out   overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto overflow-hidden bg-zinc-50 dark:bg-[#313131] no-scrollbar w-[400px] shadow-sm`}
    >
      <div
        className={`bg-zinc-100 dark:bg-[#313131]  border border-[#1f1f1f]/10 dark:border-[#363636]   `}
      >
        <Accordion.Root
          className={`min-w-[100%] relative pt-0 transition-[padding] duration-150 ease-in-out ${!open && "p-0"}`}
        >
          <div
            className={`sticky top-0 z-10  rounded-xl bg-zinc-100 dark:bg-[#313131]  transition-[padding] duration-150 ease-in-out ${open && "pt-2"}`}
          >
            <div className="border border-[#1f1f1f]/10 dark:border-[#363636] bg-zinc-50 dark:bg-[#363636]/60  px-4 py-4 rounded-lg">
              <div className="flex gap-3 items-center">
                {open && (
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-[#2b2b2b]">
                    <CategoryIcon name={course?.category?.name} />
                  </div>
                )}
                {open ? (
                  <div className="flex gap-2 justify-between items-center">
                    <div className="flex">
                      <h2 className={`text-base line-clamp-2`}>
                        {course.title}
                      </h2>
                    </div>
                    <span
                      className="p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                      onClick={() => setOpen(!open)}
                    >
                      {open && <IconX className="size-6" />}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2 justify-between items-center">
                    <div className="flex flex-col w-full  pr-7">
                      <h2
                        className={`text-base dark:text-zinc-200 font-semibold text-zinc-600 line-clamp-1`}
                      >
                        {course.title}
                      </h2>
                      {nextLesson && (
                        <Link
                          href={`/watch/${course.id}/${nextLesson.id}`}
                          className="text-sm dark:text-zinc-400 line-clamp-1 text-zinc-600 hover:dark:text-zinc-500 hover:text-zinc-500"
                        >
                          <span className="pr-1 font-semibold">A seguir: </span>
                          {nextLesson?.title} {currentLesson.position}/
                          {numberOfLessons(course.chapters)}
                        </Link>
                      )}
                      {!nextLesson && (
                        <Link
                          href={`/watch/${course.id}}`}
                          className="text-sm dark:text-zinc-400  line-clamp-1 text-zinc-600 hover:dark:text-zinc-500 hover:text-zinc-500"
                        >
                          <span className="pr-1 font-semibold">
                            Etapa final do curso
                          </span>
                          {currentLesson.position}/
                          {numberOfLessons(course.chapters)}
                        </Link>
                      )}
                    </div>
                    <span
                      className="p-2 flex rounded-xl hover:bg-white/5 cursor-pointer"
                      onClick={() => setOpen(!open)}
                    >
                      {!open && <IconChevronDown className="size-6" />}
                    </span>
                  </div>
                )}
              </div>

              {open && (
                <div
                  className={`mt-3 w-full bg-zinc-200 rounded dark:bg-[#1f1f1f] my-2`}
                >
                  <div
                    className={`bg-emerald-300 dark:bg-[#015F43] text-xs font-medium text-[#015F43] dark:text-zinc-100 text-center p-1 leading-none rounded whitespace-nowrap transition-[width] duration-300 ease-in-out`}
                    style={{ width: `${coursePercentage}%` }}
                  >
                    {Math.round(coursePercentage)}% Completado
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`px-2 py-2 rounded-lg border border-[#1f1f1f]/10 dark:border-[#363636]  rounded-b-xl  overscroll-x-none overscroll-y-none no-scrollbar overflow-hidden flex flex-col gap-2 ${!open && "hidden"}`}
          >
            {course?.chapters?.map((chapter, index) => (
              <Accordion.Item
                className="py-8 px-3 bg-zinc-100 dark:bg-[#313131] rounded-lg hover:dark:bg-[#363636]"
                key={chapter.id}
                startContent={
                  <div
                    className={moduleCircle({
                      active: index === indexActive,
                      done: checkDoneModule(chapter, chapter.position),
                    })}
                  >
                    <div className="flex items-center text-center justify-center">
                      {index === indexActive ? (
                        <IconPlayerPause className="m-1 w-4 h-4" />
                      ) : (
                        chapter.position
                      )}
                    </div>
                  </div>
                }
                subtitle={`${chapter.lessons.length} Aulas · ${formatSecondsToMinutes(getChapterDuration(chapter))}`}
                index={chapter.position}
                title={chapter.title}
              >
                <div className="py-1 px-0" ref={listItems}>
                  <ol className="relative flex flex-col gap-0.5">
                    {chapter.lessons.map((lesson, i) => (
                      <li
                        key={lesson.id}
                        className={`px-4 py-2.5 cursor:pointer  flex gap-2 w-full items-center justify-between text-zinc-600 rounded-md hover:bg-zinc-100 dark:hover:bg-[#363636] group ${checkDoneLesson(chapter.position, lesson.position, lesson.id) ? " " : ""}`}
                      >
                        <span
                          className={lessonStyle({
                            active:
                              lesson.id === currentLesson.id &&
                              chapter.id === currentLesson.chapterId,
                            done: checkDoneLesson(
                              chapter.position,
                              lesson.position,
                              lesson.id,
                            ),
                          })}
                          onClick={() =>
                            markAsDone({
                              index: chapter.position,
                              lessons: [lesson.position],
                            })
                          }
                        >
                          <span
                            className={`text-xs ${
                              lesson.id === currentLesson.id &&
                              chapter.id === currentLesson.chapterId &&
                              ""
                            }`}
                          >
                            {i === lesseonIndexActive &&
                            index === indexActive ? (
                              <IconEye className="size-5" />
                            ) : (
                              <IconPresentation className="size-5" />
                            )}
                          </span>
                        </span>
                        <Link
                          href={`/watch/${course.id}/${lesson.id}`}
                          className="flex gap-2"
                        >
                          <h3
                            className={`${
                              checkDoneLesson(
                                chapter.position,
                                lesson.position,
                                lesson.id,
                              )
                                ? "text-green-500 hover:text-green-400"
                                : lesson.id === currentLesson.id
                                  ? "text-zinc-900 dark:text-zinc-50  dark:hover:text-zinc-300"
                                  : "text-zinc-900 dark:text-zinc-400  dark:hover:text-zinc-300"
                            }  max-w-[200px] min-w-[190px] truncate text-end  text-[13px] `}
                            onClick={() => markAsActive(index, i)}
                          >
                            {lesson.title}
                          </h3>
                          <span className="text-zinc-400 pl-2">
                            {formatSecondsToMinutes(lesson.video.duration)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </Accordion.Item>
            ))}
          </div>
        </Accordion.Root>
      </div>
    </div>
  );
}

export default ClassContent;
