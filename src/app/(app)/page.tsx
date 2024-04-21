import {
  IconNotebook,
  IconPlayerPlay,
  IconChevronRight,
  IconPresentation,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";
import Course from "../components/Course";
import Tag from "../components/Tag/Tag";
import Image from "next/image";
import { serverClient } from "../_trpc/serverClient";
import CategoryIcon from "../components/ClassContent/_components/CategoryIcon";
import Photoshop from "./_components/Photoshop";
import CourseSection from "./_components/CourseSection";

export default async function Home() {
  const courses = await serverClient.course.getAll();
  if (!courses) return null;
  const recomended = await serverClient.course.getAll();
  if (!recomended) return null;
  recomended.pop();
  return (
    <div className=" pt-[78px] flex flex-col gap-4">
      <div
        className={`relative  flex-col items-start bg-zinc-950  dark:bg-grid-small-white/[0.2]  bg-dot-black/[0.2]  max-h-[503px] min-h-[500px]`}
        style={{
          backgroundImage: `url(${courses[courses.length - 1].imageUrl})`,
        }}
      >
        <div className="absolute top-0 left-0 max-w-[350px]">
          <div className="pl-10 pt-10 flex flex-col gap-4">
            <Photoshop className="size-32" />
            <div color="flex">
              <h2 className=" pr-20 text-zinc-100 text-xl font-semibold md:leading-[140%] line-clamp-3">
                {courses[courses.length - 1].title}
              </h2>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 backdrop-blur-md left-0 px-10 pb-10 pt-6 space-y-2 max-w-[100%]">
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <Link
                href={`/watch/${courses[courses.length - 1].id}/${courses[courses.length - 1].chapters[0].lessons[0].id}`}
                className=""
              >
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-[#1f1f1f] text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
                >
                  <div className="flex flex-1 justify-center items-center gap-2">
                    <span className="text-base leading-6 text-nowrap">
                      Começar a assistir
                    </span>
                  </div>
                </button>
              </Link>
              <button
                type="button"
                className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-[#1f1f1f] text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
              >
                <div className="flex flex-1 justify-center items-center gap-2">
                  <span className="text-base leading-6 text-nowrap">
                    Guardar na minha lista
                  </span>
                </div>
              </button>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 text-zinc-200 ">
                <p className="text-zinc-200 text-sm text-[15px] line-clamp-2 md:line-clamp-3">
                  {courses[courses.length - 1].description}
                </p>
                <div className="flex gap-2">
                  <Tag
                    name={courses[courses.length - 1].category?.name}
                    className="text-zinc-200"
                  />
                  <div className="flex gap-1 items-center ">
                    <div className="flex gap-1">
                      <IconNotebook className="size-4 text-zinc-400" />
                      <span className="text-xs ">
                        {courses[courses.length - 1].chapters.length} Modulos ·
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <IconPresentation className="size-4 text-zinc-400" />
                      <span className="text-xs ">
                        {courses[courses.length - 1].chapters.length} Aulas ·
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <IconClock className="size-4 text-zinc-400" />
                      <span className="text-xs"> 5 horas</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 min-w-[256px]">
                <p className="text-zinc-200 text-sm text-[15px] line-clamp-2 md:line-clamp-2">
                  <span className="font-semibold ">Instrutor: </span>{" "}
                  {courses[courses.length - 1].author.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CourseSection title="Cursos recomendados" courses={recomended} />
      <CourseSection title="Cursos da casa" courses={recomended.toReversed()} />
    </div>
  );
}
