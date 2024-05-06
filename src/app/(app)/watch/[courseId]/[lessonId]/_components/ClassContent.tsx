"use client";

import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import Link from "next/link";

import { IconChevronDown, IconX } from "@tabler/icons-react";
import { Accordion } from "@/app/components/Accordion";
import CategoryIcon from "./CategoryIcon";
import { trpc } from "@/app/_trpc/client";
import { ClassContentLesson } from "./ClassContentLesson";
import { ClassContentChapter } from "./ClassContentChapter";

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
  chapter?: any;
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

  const checkDoneLesson = (lessonId: string) => {
    const done = trpc.lesson.checkDone.useQuery(lessonId);

    return !!done.data;
  };

  const checkDonesinChapter = (chapter: Chapter): string[] => {
    let dones: string[] = [];
    chapter.lessons.map((lesson) => {
      const done = trpc.lesson.checkDone.useQuery(lesson.id);
      if (!!done.data) {
        dones = [...dones, lesson.id];
      }
    });

    return dones;
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
      className={`${open ? "h-[480px] max-h-[480px]" : "max-h-[116px]"} transition-[max-height] duration-150 ease-in-out   overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto  overflow-hidden bg-zinc-50 dark:bg-[#313131] no-scrollbar w-[400px] shadow-sm`}
    >
      <div
        className={`bg-zinc-100 dark:bg-[#313131]  border border-[#1f1f1f]/10 dark:border-[#363636]   `}
      >
        <Accordion.Root
          indexOpen={currentLesson.chapter.position}
          removable
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
                    <button
                      className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]"
                      onClick={() => setOpen(!open)}
                    >
                      {open && <IconX />}
                    </button>
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
                    <button
                      className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]"
                      onClick={() => setOpen(!open)}
                    >
                      {!open && <IconChevronDown />}
                    </button>
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
            className={`px-2 py-2 rounded-lg border border-[#1f1f1f]/10 dark:border-[#363636]  rounded-b-xl  overscroll-x-none overscroll-y-none no-scrollbar flex flex-col gap-2 ${!open && "hidden"}`}
          >
            {course?.chapters?.map((chapter, index) => (
              <ClassContentChapter
                key={chapter.id}
                active={chapter.position === currentLesson.chapter.position}
                duration={getChapterDuration(chapter)}
                nLessons={chapter.lessons.length}
                title={chapter.title}
                position={chapter.position}
                dones={checkDonesinChapter(chapter)}
              >
                {chapter.lessons.map((lesson, i) => (
                  <ClassContentLesson
                    key={lesson.id}
                    courseId={course.id}
                    lessonId={lesson.id}
                    duration={lesson.video.duration}
                    title={lesson.title}
                    done={checkDoneLesson(lesson.id)}
                    active={
                      lesson.id === currentLesson.id &&
                      chapter.id === currentLesson.chapterId
                    }
                    markAsActive={() => markAsActive(index, i)}
                  />
                ))}
              </ClassContentChapter>
            ))}
          </div>
        </Accordion.Root>
      </div>
    </div>
  );
}

export default ClassContent;
