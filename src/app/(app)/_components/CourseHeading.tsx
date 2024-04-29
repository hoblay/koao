"use client";
import { IconClock, IconNotebook, IconPresentation } from "@tabler/icons-react";
import React from "react";
import Link from "next/link";
import CourseIcon from "./CourseIcon";
import TagIcon from "@/app/components/Tag/TagIcon";
import { useSession } from "next-auth/react";
import { Modal } from "@/app/components/Modal";
import Button from "@/app/components/Button/Button";
import LogoIcon from "@/app/components/Icons/Logo";
import SignIn from "@/app/(auth)/signin/page";
import { trpc } from "@/app/_trpc/client";
interface CourseProps {
  className?: string;
  progress?: number;
  image: string | null;
  title: string;
  modules: number;
  category: string | undefined;
  description: string | null;
  id: string;
  author: string | null;
  lessonId?: string;
  tag: string | null;
}

function CourseHeading({
  className,
  id,
  tag,
  progress,
  image,
  lessonId,
  title,
  modules,
  author,
  description,
  category,
}: CourseProps) {
  const { data: session, status } = useSession();

  const lastSeen = trpc.lesson.getLastWatchByCourse.useQuery(id);
  return (
    <div
      className={`relative  flex-col items-start bg-zinc-950  dark:bg-grid-small-white/[0.2]  bg-dot-black/[0.2]  max-h-[503px] min-h-[450px]`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute top-0 left-0 max-w-[400px]">
        <div className="pl-10 pt-10 flex flex-col gap-4 ">
          <CourseIcon name={tag} />
          <div color="flex">
            <h2 className=" pr-20 drop-shadow-2xl   text-zinc-100 text-xl font-semibold md:leading-[140%] line-clamp-3">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 backdrop-blur-md left-0 px-10 pb-10 pt-6 space-y-2 max-w-[100%]">
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 w-full">
            {lastSeen.data ? (
              <Link
                href={
                  session?.user ? `/watch/${id}/${lastSeen.data.id}` : "/signin"
                }
                className=""
              >
                <Button size="lg" fullWidth className="py-3">
                  <span className="text-base">Continuar a assistir</span>
                </Button>
              </Link>
            ) : (
              lessonId && (
                <Link
                  href={session?.user ? `/watch/${id}/${lessonId}` : "/signin"}
                  className=""
                >
                  <Button size="lg" fullWidth className="py-3">
                    <span className="text-base">Começar a assistir</span>
                  </Button>
                </Link>
              )
            )}
            <Button size="lg" fullWidth className="py-3">
              <span className="text-base">Guardar na minha lista</span>
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 text-zinc-200 ">
              <p className="text-zinc-200 text-sm text-[15px] line-clamp-2 md:line-clamp-3">
                {description}
              </p>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center max-h-[32px]">
                  <div className="flex gap-1 items-center !text-xs">
                    <TagIcon name={category} />
                    <span className="text-xs ">{category} ·</span>
                  </div>
                  <div className="flex gap-1">
                    <IconNotebook className="size-4 text-zinc-400" />
                    <span className="text-xs ">{modules} Modulos ·</span>
                  </div>
                  <div className="flex gap-1">
                    <IconPresentation className="size-4 text-zinc-400" />
                    <span className="text-xs ">{modules} Aulas ·</span>
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
                <span className="font-semibold ">Instrutor: </span> {author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseHeading;
