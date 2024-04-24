"use client";

import React, { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import Link from "next/link";

import {
  IconChevronDown,
  IconEye,
  IconPlayerPause,
  IconX,
} from "@tabler/icons-react";
import { Accordion } from "@/app/components/Accordion";
import CategoryIcon from "./CategoryIcon";

const moduleCircle = tv({
  base: " w-9 h-9 rounded-full p-1 border-2 border-zinc-300 text-zinc-600 dark:text-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-[#1f1f1f] items-center justify-center",
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
  base: "absolute flex items-center justify-center w-6 h-6 bg-[#015F43] rounded-full -start-[13px] ring-4 ring-zinc-50 dark:ring-[#1f1f1f]/40 hover:ring-8 dark:bg-[#1f1f1f]   cursor-pointer transition-all duration-150 ease-in-out",
  variants: {
    active: {
      true: "ring-[#015F43] dark:ring-[#015F43] hover:ring-8 hover:ring-[#015F43]/30 dark:hover:ring-[#015F43]/30 dark:bg-[#1f1f1f] ",
    },
    done: {
      true: "ring-zinc-50 dark:ring-[#313131]/50 hover:ring-8 bg-[#015F43] dark:bg-[#015F43] ",
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
  nextLesson,
  lesson: currentLesson,
  chapterPosition,
}: {
  course: Course;
  nextLesson: Lesson;
  lesson: Lesson;
  chapterPosition: number;
}) {
  const [open, setOpen] = useState(true);
  const [coursePercentage, setCoursePercentage] = useState<number>(0);
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

  const checkDoneLesson = (parentIndex: number, index: number) => {
    let lessonModule = lessonsDone.find((item) => item.index === parentIndex);

    return (
      lessonModule && !!lessonModule.lessons.find((item) => item === index)
    );
  };

  const lessonsNumber = Object.keys(course.chapters).length;

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

    setCoursePercentage(finalPercentage);
  }, [lessonsDone, lessonsNumber, course.chapters]);

  return (
    <div
      className={`${open ? "h-[480px] max-h-[480px]" : "max-h-[116px]"} transition-[max-height] duration-150 ease-in-out   overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto overflow-hidden bg-zinc-50 dark:bg-[#313131] no-scrollbar w-[400px] shadow-sm`}
    >
      <div className={`bg-zinc-100 dark:bg-[#313131]   `}>
        <Accordion.Root
          className={`min-w-[100%] relative pt-0 transition-[padding] duration-150 ease-in-out ${!open && "p-0"}`}
        >
          <div
            className={`sticky top-0 z-10  rounded-xl bg-zinc-100 dark:bg-[#313131]  transition-[padding] duration-150 ease-in-out ${open && "pt-2"}`}
          >
            <div className=" bg-zinc-50 dark:bg-[#363636]  px-4 py-4 rounded-xl">
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
            className={`px-3 py-2 dark:bg-[#1f1f1f]/5 rounded-b-xl  overscroll-x-none overscroll-y-none no-scrollbar overflow-hidden flex flex-col gap-1 ${!open && "hidden"}`}
          >
            {course?.chapters?.map((chapter, index) => (
              <Accordion.Item
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
                index={chapter.position}
                title={chapter.title}
              >
                <div className="py-0 px-7" ref={listItems}>
                  <ol className="relative">
                    {chapter.lessons.map((lesson, i) => (
                      <li
                        key={lesson.id}
                        className={`pb-4 p-1  border-s-2 pl-7 -ml-[2px] pt-3 ${checkDoneLesson(chapter.position, lesson.position) ? "border-[#015F43] dark:border-[#015F43] " : "border-zinc-200 dark:border-[#1f1f1f]/20"}`}
                      >
                        <span
                          className={lessonStyle({
                            active:
                              i === lesseonIndexActive && index === indexActive,
                            done: checkDoneLesson(
                              chapter.position,
                              lesson.position,
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
                            className={`text-xs text-[#015F43] dark:text-zinc-50 ${
                              i === lesseonIndexActive &&
                              index === indexActive &&
                              "text-zinc-50"
                            }`}
                          >
                            {i === lesseonIndexActive &&
                            index === indexActive ? (
                              <IconEye className="w-3 h-3" />
                            ) : (
                              i + 1
                            )}
                          </span>
                        </span>
                        <Link
                          href={`/watch/${course.id}/${lesson.id}`}
                          className=""
                        >
                          <h3
                            className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300"
                            onClick={() => markAsActive(index, i)}
                          >
                            {lesson.title}
                          </h3>
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