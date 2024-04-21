"use client";

import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Card } from "@/app/components/Card";
import Tag from "@/app/components/Tag/Tag";
import {
  EraserIcon,
  CodeIcon,
  ArrowTopRightIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { IconNotebook, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ params }: { params: { courseId: string } }) {
  const course = trpc.course.getById.useQuery(params.courseId);
  if (!course.data) {
    return null;
  }
  return (
    <div className=" py-[78px]  flex flex-col gap-4">
      <div className=" relative  flex-col items-start bg-amber-950  dark:bg-grid-small-white/[0.2]  bg-dot-black/[0.2]  max-h-[503px] min-h-[500px]">
        <div className="absolute bottom-0 left-0 max-w-[48%]">
          <div className="pl-10 pt-10 flex flex-col gap-4">
            <Image
              src={course.data.imageUrl || ""}
              className="object-cover rounded-xl"
              alt="course"
              width={311}
              height={182.812}
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>

          <div className="pl-10 pt-4 flex flex-col gap-4">
            <div color="flex">
              <h2 className=" pr-20 text-zinc-100 text-3xl font-semibold md:leading-[140%] line-clamp-5">
                {course.data.title}
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-10 max-w-[350px]">
            {course?.data?.chapters[0]?.lessons[0] && (
              <Link
                href={`/watch/${course.data.id}/${course.data.chapters[0].lessons[0].id}`}
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
            )}
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
        </div>
      </div>
      <div className="px-9 flex gap-4 justify-between">
        <div className="w-full max-w-[723px] space-y-4">
          <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
            Sobre o curso
          </h2>
          <Card.Root>
            <Card.Body className="p-4">
              <div className="flex flex-col gap-6">
                <p className="text-base">{course.data.description}</p>
              </div>
            </Card.Body>
          </Card.Root>
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
        </div>

        <div className=" space-y-4">
          <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
            Detalhes do curso
          </h2>
          <Card.Root>
            <Card.Body className="p-4">
              <div className="flex flex-col items-start gap-3 self-stretch">
                <div className="flex items-center gap-4 self-stretch">
                  <div className="flex w-8 h-8 justify-center items-center rounded-full border dark:border-zinc-800 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-base">
                    <EraserIcon />
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                      Nível de dificuldade
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-100 text-sm">
                      Intermediário
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 self-stretch">
                  <div className="flex w-8 h-8 justify-center items-center rounded-full border dark:border-zinc-800 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-base">
                    <VideoIcon />
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                      Aulas
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-100 text-sm">
                      299 aulas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 self-stretch">
                  <div className="flex w-8 h-8 justify-center items-center rounded-full border dark:border-zinc-800 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-base">
                    <CodeIcon />
                  </div>
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                      Atividades
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-100 text-sm">
                      6 desafios e 34 testes
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  );
}
