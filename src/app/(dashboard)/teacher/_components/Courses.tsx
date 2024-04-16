import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";
import { formatTime } from "@/utils/format-time";
import { IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
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
          className="min-h-[206px] w-full border border-zinc-900 bg-zinc-900/70 rounded-2xl justify-between flex flex-col"
        >
          <Card.Body className="dark:bg-zinc-900 p-5 rounded-2xl rounded-b-none flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2 overflow-x-hidden">
              <Link href={`/teacher/${course.id}`}>
                <h4>{course.title}</h4>
              </Link>
              <span className="text-zinc-500">
                {course.chapters.length} modulos ·{" "}
                {lessonsNumber(course.chapters)} aulas
              </span>
            </div>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10">
                  <IconDots />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Menu className="top-10 -right-4">
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
          <Card.Footer className="flex py-4 px-5 max-h-[56px] bg-zinc-950/40 rounded-b-2xl">
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
