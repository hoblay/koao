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
    <div className="px-9 ">
      <div className="relative  flex-col items-start bg-zinc-200 dark:bg-zinc-950  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]  rounded-xl max-h-[343px] min-h-[340px]">
        <div className="py-16 px-10 space-y-2 max-w-[70%]">
          <h2 className="text-zinc-700 pr-20 dark:text-zinc-100 text-xl md:text-4xl font-bold md:leading-[140%] line-clamp-2">
            {course.data.title}
          </h2>
          <p className="text-zinc-700 dark:text-zinc-200 text-sm md:text-base line-clamp-2 md:line-clamp-2">
            {course.data.description}
          </p>
          <div className="flex gap-3 py-2">
            <Tag
              name={`${course.data.chapters.length} Modulos`}
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
              src={course.data.imageUrl ? course.data.imageUrl : ""}
              className="rounded-xl w-[313px] max-h-[176px] object-cover"
              alt="course"
              width={313}
              height={176}
              unoptimized
            />
          </div>

          {course?.data?.chapters[0]?.lessons[0] && (
            <div className="px-2">
              <Link
                href={`/watch/${course.data.id}/${course.data.chapters[0].lessons[0].id}`}
                className=""
              >
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43] hover:bg-[#143229] text-white px-8 py-3 text-2xl w-full"
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
      <div className="py-4 flex gap-4">
        <div className="w-full max-w-[923px] space-y-4">
          <Card.Root className="">
            <Card.Header showDivider className="flex px-8 py-5">
              <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
                Sobre o curso
              </h4>
              <div className="flex items-center gap-3"></div>
            </Card.Header>
            <Card.Body className="py-5 px-8">
              <div className="flex flex-col gap-6 leading-[1.6]">
                <p>{course.data.description}</p>
              </div>
            </Card.Body>
          </Card.Root>
          <Card.Root className="">
            <Card.Header showDivider className="flex px-8 py-5">
              <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
                Educador
              </h4>
            </Card.Header>
            <Card.Body className="py-5 px-8">
              <div className="flex gap-4">
                <Avatar
                  name={course.data.author.name}
                  image={course.data.author.image}
                  color="green"
                  size="lg"
                />
                <div className="flex flex-col align-center justify-center">
                  <span className="text-zinc-800 dark:text-zinc-100 text-base">
                    {course.data.author.name}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Front End Developer
                  </span>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="flex px-8 pb-5 flex-col gap-6 text-base text-zinc-700 dark:text-zinc-200 leading-[1.6]">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex,
                qui expedita! Assumenda, doloribus. Aperiam, natus! Eius a sed
                dicta vero nobis officia deserunt ratione, harum minima enim quo
                quaerat consequuntur ipsam! Hic, enim ex voluptatum totam
                doloremque nobis.
              </p>
            </Card.Footer>
          </Card.Root>
        </div>

        <div className="max-w-[352px] space-y-4">
          <div className="justify-center items-center pt-4 pb-7 bg-zinc-50 dark:bg-zinc-900 w-full  rounded-xl shadow-sm flex-col space-y-4">
            <div className="flex px-7 pt-24 flex-col items-center gap-2 self-stretch">
              <h3 className="text-zinc-700 dark:text-zinc-100 text-center text-base font-semibold">
                Tenha acesso a todas as formações da plataforma em uma única
                assinatura
              </h3>
              <p className="text-zinc-700 dark:text-zinc-200 text-center text-xs">
                Assinando você recebe acesso imediato a todas as formações do
                zero ao avançado
              </p>
            </div>
            <div className="px-7">
              <Link href="#" className="items-center flex justify-center">
                <button className="rounded-2xl flex border-2 border-dashed border-emerald-950 bg-[#015F43] px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#02533a] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                  <span className="text-base leading-6">Quero assinar</span>
                  <ArrowTopRightIcon />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col self-stretch rounded-xl bg-zinc-50 dark:bg-zinc-900 px-6 py-5 gap-4">
            <h3 className="text-sm text-zinc-600 dark:text-zinc-300 font-semibold">
              Detalhes do curso
            </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}
