import { trpc } from "@/app/_trpc/client";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";
import { formatTime } from "@/utils/format-time";
import {
  IconClock,
  IconDots,
  IconEdit,
  IconEye,
  IconNotebook,
  IconPresentation,
  IconTrash,
} from "@tabler/icons-react";
import Avatar from "@/app/components/Avatar/Avatar";
import Link from "next/link";
import React from "react";

function Courses() {
  const courses = trpc.course.getAllbyUser.useQuery();

  const deleteCourse = trpc.course.deleteCourse.useMutation({
    onSettled: () => {
      courses.refetch();
    },
  });

  const removeCourse = (id: string) => {
    deleteCourse.mutate(id);
  };

  const lessonsNumber = (chapters: any) => {
    let nLessons = 0;
    chapters.map((chapter: any) => {
      chapter.lessons.map((lesson: any) => {
        nLessons++;
      });
    });
    return nLessons;
  };

  return (
    <div className="grid lg:grid-cols-3  md:grid-cols-2 py-6 gap-4">
      {courses?.data?.map((course) => (
        <Card.Root
          key={course.id}
          bg={false}
          className="min-h-[206px] w-full border border-[#1f1f1f]/10 dark:border-[#363636]  rounded-lg justify-between flex flex-col"
        >
          <Card.Body className=" p-3 rounded-lg rounded-b-none flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2 overflow-x-hidden">
              <Link href={`/teacher/${course.id}`}>
                <h4 className="text-base text-balance ">{course.title}</h4>
              </Link>
              <div className="flex gap-1">
                <div className="flex gap-1">
                  <IconNotebook className="size-4 text-zinc-500 dark:text-zinc-400" />
                  <span className="text-xs ">
                    {course.chapters.length} Modulos ·
                  </span>
                </div>
                <div className="flex gap-1">
                  <IconPresentation className="size-4 text-zinc-500 dark:text-zinc-400" />
                  <span className="text-xs ">
                    {lessonsNumber(course.chapters)} Aulas ·
                  </span>
                </div>
                <div className="flex gap-1">
                  <IconClock className="size-4 text-zinc-500 dark:text-zinc-400" />
                  <span className="text-xs">20 horas</span>
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
                    description={"Ver o curso "}
                    startContent={<IconEye className="text-zinc-600" />}
                    href={`/teacher/${course.id}`}
                  />
                  <Dropdown.Item
                    title="Editar o curso"
                    description={"Aperte para editar"}
                    startContent={<IconEdit className="text-zinc-600" />}
                    href={`/teacher/${course.id}`}
                  />
                  <Dropdown.Item
                    title="Eliminar o curso"
                    description={"Aperte para eliminar"}
                    startContent={<IconTrash className="text-red-500" />}
                    onClick={() => removeCourse(course.id)}
                  />
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Root>
          </Card.Body>
          <Card.Footer className="flex py-3 px-3 max-h-[56px] bg-[#015f43]/30 dark:bg-[#1f1f1f]/40 rounded-b-lg">
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
      ))}
    </div>
  );
}

export default Courses;
