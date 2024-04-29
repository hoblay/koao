"use client";

import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Card } from "@/app/components/Card";

import CourseHeading from "../../_components/CourseHeading";
import ChapterSection from "../../_components/ChapterSection";

export default function Home({ params }: { params: { courseId: string } }) {
  const course = trpc.course.getById.useQuery(params.courseId);
  if (!course.data) {
    return null;
  }
  return (
    <div className=" py-[78px]  flex flex-col gap-4">
      <CourseHeading
        title={course.data.title}
        modules={course.data.chapters.length}
        category={course.data.category?.name}
        description={course.data.description}
        image={course.data.cover}
        id={course.data.id}
        tag={course.data.tag}
        lessonId={course.data?.chapters[0]?.lessons[0]?.id}
        author={course.data.author.name}
      />
      <div>
        {course.data.chapters.map((chapter, index) => (
          <ChapterSection
            lessons={chapter.lessons}
            title={chapter.title}
            key={chapter.id}
            tag={course.data?.tag}
            courseId={course.data?.id}
            courseImage={course.data?.imageUrl || course.data?.cover}
            category={course.data?.category?.name}
          />
        ))}
      </div>
      <div className="px-9 flex gap-4 justify-between">
        <div className="w-full max-w-[623px] space-y-4">
          <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
            Educador
          </h2>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <Avatar
                name={course.data.author.name}
                image={course.data.author.image}
                color="green"
                size="xl"
              />
              <div className="flex flex-col text-center justify-center">
                <span className="text-zinc-800 dark:text-zinc-100 text-xs">
                  {course.data.author.name}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 text-xs">
                  Front End Developer
                </span>
              </div>
            </div>
          </div>
          <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
            Sobre o curso
          </h2>
          <Card.Root>
            <Card.Body className="p-4">
              <div className="flex flex-col gap-6">
                <p className="text-base line-clamp-[8]">
                  {course.data.description}
                </p>
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  );
}
