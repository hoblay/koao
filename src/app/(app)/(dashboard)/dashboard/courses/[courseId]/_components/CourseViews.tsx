"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";

import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";

import {
  IconBookOff,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconEditCircle,
  IconEye,
  IconLayoutGrid,
  IconNotebook,
  IconTable,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CoursesViews } from "../../_components/CoursesViews";
import CreateChapter from "./CreateChapter";
import SelectVisibility from "./SelectVisibility";

export function CourseViews({
  chapters,
  courseId,
}: {
  chapters: any[];
  courseId: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const course = trpc.course.getById.useQuery(courseId);
  if (!course.data) return null;
  const edit = searchParams.get("edit");
  return (
    <>
      <div className="flex flex-col pl-[256px]">
        <header className="w-full max-w-[1116px]  fixed z-[11]  top-[78px] bg-white dark:bg-[#2d2d2d] border-t px-4 py-2  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex justify-between ">
            <Breadcrumb.RootA>
              <Breadcrumb.Item
                first
                href="/dashboard"
                title="Painel de controle"
              />
              <Breadcrumb.Item href="/dashboard/courses" title="Cursos" />
              <Breadcrumb.Item
                href={`/dashboard/courses/${course.data.id}`}
                title={`${course.data.title}`}
              />
            </Breadcrumb.RootA>
            <div className="flex gap-2 pr-4">
              <Modal.Root>
                <Modal.Trigger>
                  <Tag
                    name="Eliminar"
                    startContent={
                      <IconTrash className="text-red-500 w-5 h-5" />
                    }
                  />
                </Modal.Trigger>
                <Modal.Content className="h-full p-0">
                  <IconBookOff className="size-8 text-red-600 absolute top-6 left-[200px]" />
                  <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-4">
                    <div className="flex flex-col gap-4 pt-4 relative">
                      <h2 className="text-2xl font-semibold ">
                        Desejas eliminar o curso?
                      </h2>
                      <span className="text-zinc-500 text-sm text-pretty">
                        Como medida preventiva, pedimos que digite o nome:
                        <p>{course.data.title}</p>
                      </span>
                      <input
                        type="text"
                        name="CourseName"
                        placeholder={course.data.title}
                        className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none border border-[#1f1f1f]/10 dark:border-[#363636] p-2.5 justify-between font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#1f1f1f] dark:hover:bg-[#2d2d2d] dark:focus:bg-[#2d2d2d]"
                      />
                      <Button fullWidth size="lg">
                        <span className="text-base">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                </Modal.Content>
              </Modal.Root>
              <Link href={`/dashboard/courses/${course.data.id}?edit=true`}>
                <Tag
                  name="Editar"
                  startContent={<IconEdit className="text-zinc-500 w-5 h-5" />}
                />
              </Link>
              <SelectVisibility
                courseId={courseId}
                published={course.data.isPublished ? "true" : "false"}
              />
            </div>
          </div>
        </header>

        <div className="relative rounded-lg pt-[52px] w-full ">
          {chapters.length > 0 ? (
            <table className="w-full min-w-[1116px]  text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
              <thead className="font-medium  bg-zinc-50  dark:bg-[#2a2a2a] z-10   sticky top-[131.5px] text-zinc-700 dark:text-zinc-100 border border-[#1f1f1f]/10 dark:border-[#363636]">
                <tr className="items-center justify-center">
                  <th scope="col" className="px-4 py-3 flex gap-4">
                    <input
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                      name="checkAll"
                    />
                    <label htmlFor="checkAll">Modulos</label>
                  </th>
                  <th scope="col" className="px-12 py-3">
                    Duração
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Aulas
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Atualizado por
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {chapters.map((chapter, index) => (
                  <tr
                    className="border border-[#1f1f1f]/10 dark:border-[#363636] "
                    key={chapter.id}
                  >
                    <th
                      scope="row"
                      className="px-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white max-w-96 "
                    >
                      <Link
                        href={`/dashboard/courses/${courseId}/${chapter.id}`}
                      >
                        <div className="flex gap-4 items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-[#363636]/80 border-[#1f1f1f]/10 dark:border-[#363636] cursor-pointer"
                          />
                          <div className="flex flex-col w-full overflow-ellipsis max-w-[342px] py-4">
                            <span className="text-base w-full truncate overflow-ellipsis">
                              {chapter.title}
                            </span>
                            <span className="text-sm text-zinc-500 truncate overflow-ellipsis">
                              {chapter.id}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </th>

                    <td className="px-12">3 horas</td>
                    <td className="px-4 text-nowrap">
                      {chapter.lessons.length} Aulas
                    </td>

                    <td className="px-5">
                      <div className="flex">
                        <Tag
                          startContent={
                            <IconClockEdit className="w-5 h-5 text-amber-950 dark:text-zinc-400" />
                          }
                          name="Em andamento"
                        />
                      </div>
                    </td>
                    <td className="px-4">
                      <div className="flex items-center space-x-2 relative ">
                        <Avatar
                          name={course.data?.author.name}
                          image={course.data?.author.image}
                          color="green"
                          size="xs"
                        />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 text-nowrap ">
                          Atualizado há 50 minutos
                        </span>
                      </div>
                    </td>
                    <td className="px-7 text-right ">
                      <Dropdown.Root>
                        <Dropdown.Trigger>
                          <button className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]">
                            <IconDots />
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu className="-top-4 -left-52">
                          <Dropdown.Section>
                            <Dropdown.Item
                              title="Previzualizar"
                              description={"Ver o curso "}
                              startContent={
                                <IconEye className="text-zinc-600" />
                              }
                            />
                            <Dropdown.Item
                              title="Editar o curso"
                              description={"Aperte para editar"}
                              startContent={
                                <IconEdit className="text-zinc-600" />
                              }
                            />
                            <Modal.Root>
                              <Modal.Trigger>
                                <div className="flex">
                                  <Dropdown.Item
                                    title="Eliminar o curso"
                                    description={"Aperte para eliminar"}
                                    startContent={
                                      <IconTrash className="text-red-500" />
                                    }
                                  />
                                </div>
                              </Modal.Trigger>
                              <Modal.Content className="h-full p-0">
                                <IconBookOff className="size-8 text-red-600 absolute top-6 left-[200px]" />
                                <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-4">
                                  <div className="flex flex-col gap-4 pt-4 relative">
                                    <h2 className="text-2xl font-semibold ">
                                      Desejas eliminar o curso?
                                    </h2>
                                    <span className="text-zinc-500 text-sm text-pretty">
                                      Como medida preventiva, pedimos que digite
                                      o nome: Curso de fundamentos de
                                      inteligencia artificial.
                                    </span>
                                    <input
                                      type="text"
                                      name="CourseName"
                                      placeholder="Curso de fundamentos de
                                      inteligencia artificial"
                                      className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none border border-[#1f1f1f]/10 dark:border-[#363636] p-2.5 justify-between font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#1f1f1f] dark:hover:bg-[#2d2d2d] dark:focus:bg-[#2d2d2d]"
                                    />
                                    <Button fullWidth size="lg">
                                      <span className="text-base">
                                        Eliminar
                                      </span>
                                    </Button>
                                  </div>
                                </div>
                              </Modal.Content>
                            </Modal.Root>
                          </Dropdown.Section>
                        </Dropdown.Menu>
                      </Dropdown.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 min-w-[1116px]">
              <div className="flex   flex-col items-center justify-center w-full h-[560px] border-2 border-[#1f1f1f]/10 dark:border-[#363636] border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-[#1f1f1f] dark:bg-[#2a2a2a] hover:bg-zinc-100  hover:border-[#1f1f1f]/10 dark:hover:border-[#363636] ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IconNotebook className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                  <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">
                      Não há modulos neste momento{" "}
                    </span>
                    aperte pra adicionar.
                  </p>
                  <button onClick={() => setDrawerOpen(true)}>
                    <Tag name="Adicionar modulos" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div
          className={`${!drawerOpen ? "hidden" : ""} absolute z-30 bg-[#161616]/75 left-0 top-0 w-[100%] h-[100%] min-h-[100vh]  cursor-pointer`}
          onClick={() => setDrawerOpen(false)}
        ></div>

        <div
          className={`z-40 fixed  w-full top-0 right-0 h-[100vh] bg-white border-b border-[#1f1f1f]/10 dark:border-[#363636] dark:bg-[#2d2d2d] border-r border-r-zinc-800 md:max-w-[361px] transition-all duration-500 transform ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col ">
            <div className="flex flex-col gap-1 border border-[#1f1f1f]/10 dark:border-[#363636] p-4">
              <h2 className=" text-[17px] font-semibold ">Criar um modulo</h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Os modulos servem para agrupar as aulas com conceitos similares.
              </h3>
            </div>
            <div className="flex flex-col gap-1  p-4">
              <CreateChapter courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
