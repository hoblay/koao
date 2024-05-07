"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";

import { Modal } from "@/app/components/Modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { formatSecondsToHours } from "@/utils/format-hours";
import { formatTime } from "@/utils/format-time";

import {
  IconBookOff,
  IconClock,
  IconDots,
  IconEdit,
  IconEye,
  IconNotebook,
  IconPresentation,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteContent } from "../[courseId]/_components/DeleteContent";
interface Course {
  id: string;
  title: string;
  chapters: any[];
  updatedAt: string;
  author: {
    name: string;
    image?: string;
  };
}

export function CourseCard({
  course,
  deleteCourse,
}: {
  course: Course;
  deleteCourse: (id: string, title: string) => void;
}) {
  const getCourseData = trpc.course.getProgress.useQuery(course.id);
  return (
    <>
      <Card.Root
        bg={false}
        className="min-h-[206px] w-full border border-[#1f1f1f]/10 dark:border-[#363636]  rounded-lg justify-between flex flex-col"
      >
        <Card.Body className="p-3 rounded-lg rounded-b-none flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2 overflow-x-hidden">
            <Link href={`/dashboard/courses/${course.id}`}>
              <h4 className="text-base text-balance ">{course.title}</h4>
            </Link>
            <div className="flex gap-1">
              <div className="flex gap-1">
                <IconNotebook className="size-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs ">
                  {course.chapters.length} Modulos ·
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <IconPresentation className="size-4 text-zinc-500 dark:text-zinc-400" />

                {getCourseData.data ? (
                  <span className="text-xs ">
                    {getCourseData.data?.nlessons} Aulas ·
                  </span>
                ) : (
                  <div className="h-4 bg-gray-300 rounded-md dark:bg-[#363636] w-12 animate-pulse"></div>
                )}
              </div>
              <div className="flex gap-1 items-center">
                <IconClock className="size-4 text-zinc-500 dark:text-zinc-400" />
                {getCourseData.data ? (
                  <span className="text-xs">
                    {formatSecondsToHours(getCourseData.data.duration, "long")}
                  </span>
                ) : (
                  <div className="h-4 bg-gray-300 rounded-md dark:bg-[#363636] w-12 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <button className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]">
                <IconDots />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Section>
                <Dropdown.Item
                  title="Previzualizar"
                  href={`/dashboard/courses/${course.id}`}
                  description={"Ver o curso "}
                  startContent={<IconEye className="text-zinc-600" />}
                />
                <Dropdown.Item
                  title="Editar"
                  href={`/dashboard/courses/${course.id}?edit=true`}
                  description={"Aperte para editar"}
                  startContent={<IconEdit className="text-zinc-600" />}
                />
                <Dropdown.Item
                  title="Eliminar"
                  description={"Aperte para eliminar"}
                  onClick={() => deleteCourse(course.id, course.title)}
                  startContent={<IconTrash className="text-red-500" />}
                />
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Root>
        </Card.Body>
        <Card.Footer className="border-t border-[#1f1f1f]/10 dark:border-[#363636] flex py-3 px-3 max-h-[56px] bg-zinc-100 dark:bg-[#1f1f1f]/40 rounded-b-lg">
          <div className="flex">
            <div className="flex items-center space-x-2 relative ">
              <Avatar
                name={course.author.name}
                image={course.author.image}
                size="xs"
                color={"green"}
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-100">
                {course.author.name}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 ">
                atualizado {formatTime(new Date(course.updatedAt))}
              </span>
            </div>
          </div>
        </Card.Footer>
      </Card.Root>
    </>
  );
}
