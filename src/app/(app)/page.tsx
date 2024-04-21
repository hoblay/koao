import {
  IconNotebook,
  IconPlayerPlay,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";
import Course from "../components/Course";
import Tag from "../components/Tag/Tag";

import Image from "next/image";
import { serverClient } from "../_trpc/serverClient";

export default async function Home() {
  const courses = await serverClient.course.getAll();
  if (!courses) return null;
  const recomended = await serverClient.course.getAll();
  if (!recomended) return null;

  recomended.pop();
  return (
    <div className="px-9 flex flex-col gap-4">
      <div className="relative  flex-col items-start bg-blue-200 dark:bg-blue-950 dark:bg-grid-small-white/[0.2]  bg-dot-black/[0.2]  rounded-xl max-h-[343px] min-h-[340px]">
        <div className="py-16 px-10 space-y-2 max-w-[70%]">
          <h2 className="text-zinc-700 pr-20 dark:text-zinc-100 text-xl md:text-4xl font-bold md:leading-[140%] line-clamp-2">
            {courses[courses.length - 1].title}
          </h2>
          <p className="text-zinc-700 dark:text-zinc-200 text-sm md:text-base line-clamp-2 md:line-clamp-2">
            {courses[courses.length - 1].description}
          </p>
          <div className="flex gap-3 py-2">
            <Tag
              name={`${courses[courses.length - 1].chapters.length} Modulos`}
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
              src={courses[courses.length - 1].imageUrl || ""}
              className="rounded-xl w-[313px] max-h-[176px] object-cover"
              alt="course"
              width={313}
              height={176}
              unoptimized
            />
          </div>

          {courses[courses.length - 1].chapters[0].lessons[0] && (
            <div className="px-2">
              <Link
                href={`/watch/${courses[courses.length - 1].id}/${courses[courses.length - 1].chapters[0].lessons[0].id}`}
                className=""
              >
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-blue-500 text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
                >
                  <div className="flex flex-1 justify-center items-center gap-2">
                    <span className="text-base leading-6">
                      Começar a assistir
                    </span>
                  </div>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-[17px] font-semibold pt-3 flex gap-2 items-center">
        Cursos recomendados
      </h2>
      <div className="pb-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {recomended.map((course, index) => (
          <>
            <Course
              key={course.id}
              name={course.title}
              price={0}
              img={`${course.imageUrl}`}
              modules={course.chapters.length}
              progress={0}
              description={course.description}
              category={course.category ? course.category.name : "Programação"}
              id={course.id}
            />
          </>
        ))}
      </div>
    </div>
  );
}
