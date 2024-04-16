"use client";

import {
  IconNotebook,
  IconPlayerPlay,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { trpc } from "../_trpc/client";
import Course from "../components/Course";
import Tag from "../components/Tag/Tag";

import { Data } from "../Data/Courses";
import Image from "next/image";

export default function Home() {
  const courses = trpc.course.getAll.useQuery();
  if (!courses.data) return null;
  return (
    <div className="px-9 flex flex-col gap-4">
      <div className="relative  flex-col items-start bg-amber-200 dark:bg-amber-950 dark:bg-grid-small-white/[0.2]  bg-dot-black/[0.2]  rounded-xl max-h-[343px] min-h-[340px]">
        <div className="py-16 px-10 space-y-2 max-w-[70%]">
          <h2 className="text-zinc-700 pr-20 dark:text-zinc-100 text-xl md:text-4xl font-bold md:leading-[140%] line-clamp-2">
            {courses.data[courses.data.length - 2].title}
          </h2>
          <p className="text-zinc-700 dark:text-zinc-200 text-sm md:text-base line-clamp-2 md:line-clamp-2">
            {courses.data[courses.data.length - 1].description}
          </p>
          <div className="flex gap-3 py-2">
            <Tag
              name={`${courses.data[courses.data.length - 2].chapters.length} Modulos`}
              className="bg-zinc-50/70"
              startContent={
                <IconNotebook className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
            <Tag name={`Design`} className="bg-zinc-50/70" />
            <Tag name={`Mais`} className="bg-zinc-50/70" />
          </div>
        </div>
        <div className="absolute max-w-[345px] right-8 top-8 justify-center items-center pt-4 pb-6 px-4 bg-zinc-50/50 dark:bg-zinc-900/50 w-full  rounded-xl shadow-sm flex-col space-y-4">
          <div className="relative rounded-xl">
            <Image
              src={courses.data[courses.data.length - 2].imageUrl || ""}
              className="rounded-xl w-[313px] max-h-[176px] object-cover"
              alt="course"
              width={313}
              height={176}
              unoptimized
            />
          </div>

          {courses?.data[courses.data.length - 2]?.chapters[0]?.lessons[0] && (
            <div className="px-2">
              <Link
                href={`/watch/${courses.data[0].id}/${courses.data[courses.data.length - 2].chapters[0].lessons[0].id}`}
                className=""
              >
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-amber-500 text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
                >
                  <div className="flex flex-1 justify-center items-center gap-2">
                    <span className="text-base leading-6">
                      Continuar a assistir
                    </span>
                    <IconPlayerPlay />
                  </div>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-lg py-2 px-2 flex gap-2 items-center">
        Cursos recomendados <IconChevronRight className="w-4 h-4" />
      </h2>
      <div className="pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {courses.data.map((course, index) => (
          <>
            <Course
              key={course.id}
              name={course.title}
              price={0}
              img={`${course.imageUrl}`}
              modules={course.chapters.length}
              progress={0}
              category={"Design"}
              id={course.id}
            />
          </>
        ))}
      </div>
    </div>
  );
}
