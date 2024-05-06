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
  IconCircleMinus,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconExclamationCircle,
  IconEye,
  IconLayoutGrid,
  IconPresentation,
  IconSlash,
  IconTable,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { deleteLesson } from "../upload/_components/actions";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import { formatBytes } from "@/utils/format-bytes";
import { useDisclosure } from "@/hooks/useDisclosure";
import { DeleteContent } from "../../_components/DeleteContent";

export function ChapterViews({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [removableId, setRemovableId] = useState("");
  const [removableTitle, setRemovableTitle] = useState("");
  const [removableType, setRemovableType] = useState<
    "course" | "chapter" | "lesson"
  >("course");
  const [opened, { open, close }] = useDisclosure();

  const removeContent = (
    id: string,
    title: string,
    type: "course" | "chapter" | "lesson",
  ) => {
    setRemovableId(id);
    setRemovableType(type);
    setRemovableTitle(title);
    open();
  };
  const pathname = usePathname();
  const course = trpc.course.getById.useQuery(courseId);
  const chapter = trpc.chapter.getById.useQuery(chapterId);

  return (
    <>
      <div className="flex flex-col pl-[256px]">
        <header
          className={`${pathname === `/dashboard/courses/${courseId}/${chapterId}/upload` || pathname === `/dashboard/courses/${courseId}/${chapterId}` ? "py-2" : "py-4"} w-full max-w-[1116px]  fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t px-4   border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]`}
        >
          <div className="flex justify-between  ">
            <Breadcrumb.RootA>
              <Breadcrumb.Item
                first
                href="/dashboard"
                title="Painel de controle"
              />
              <Breadcrumb.Item href="/dashboard/courses" title="Cursos" />
              {course.data ? (
                <Breadcrumb.Item
                  href={`/dashboard/courses/${courseId}`}
                  short
                  title={`${course.data.title}`}
                />
              ) : (
                <li className="inline-flex items-center gap-0.5 ">
                  <IconSlash className="size-5 -rotate-12 text-[#1f1f1f]/10 dark:text-[#363636]" />

                  <div className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-36 animate-pulse"></div>
                </li>
              )}

              {chapter.data ? (
                <Breadcrumb.Item
                  href={`/dashboard/courses/${courseId}/${chapterId}`}
                  title={`${chapter.data.title}`}
                />
              ) : (
                <li className="inline-flex items-center gap-0.5 ">
                  <IconSlash className="size-5 -rotate-12 text-[#1f1f1f]/10 dark:text-[#363636]" />

                  <div className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-36 animate-pulse"></div>
                </li>
              )}
            </Breadcrumb.RootA>
            <div className="flex gap-2 pr-4">
              <button
                onClick={() =>
                  removeContent(chapterId, `${chapter.data.title}`, "chapter")
                }
              >
                <Tag
                  name="Eliminar"
                  startContent={<IconTrash className="text-red-500 w-5 h-5" />}
                />
              </button>
              <Tag
                name="Editar"
                startContent={<IconEdit className="text-zinc-500 w-5 h-5" />}
              />
            </div>
          </div>
        </header>

        <div className="relative rounded-lg pt-[52px] w-full ">
          <>
            {chapter.data && chapter.data.lessons.length > 0 ? (
              <table className="w-full min-w-[1116px]  text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                <thead className="font-medium   bg-zinc-50  dark:bg-[#2a2a2a] z-10 sticky top-[131.5px] text-zinc-700 dark:text-zinc-100 border border-[#1f1f1f]/10 dark:border-[#363636]">
                  <tr className="items-center justify-center">
                    <th scope="col" className="px-4 py-3 flex gap-4">
                      <input
                        type="checkbox"
                        value=""
                        className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                        name="checkAll"
                      />
                      <label htmlFor="checkAll">Aulas</label>
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Duração
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tamanho
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
                  {chapter.data?.lessons.map((lesson, index) => (
                    <tr
                      className="border border-[#1f1f1f]/10 dark:border-[#363636] "
                      key={lesson.id}
                    >
                      <th
                        scope="row"
                        className="px-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white max-w-96 "
                      >
                        <div className="flex gap-4 items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-[#363636]/80 border-[#1f1f1f]/10 dark:border-[#363636] cursor-pointer"
                          />
                          <Link
                            href={`/dashboard/courses/${courseId}/${chapterId}/${lesson.id}`}
                          >
                            <div className="flex flex-col w-full overflow-ellipsis max-w-[342px] py-4">
                              <span className="text-base w-full truncate overflow-ellipsis">
                                {lesson.title}
                              </span>
                              <span className="text-sm text-zinc-500 truncate overflow-ellipsis">
                                {lesson.id}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </th>
                      <td className="px-12 py-4">
                        {lesson.video?.duration &&
                          formatSecondsToMinutes(lesson.video.duration)}
                      </td>
                      <td className="px-4 py-4">
                        {lesson.video?.sizeInBytes &&
                          formatBytes(lesson.video.sizeInBytes)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex">
                          {lesson.video?.id ? (
                            <Tag
                              startContent={
                                <IconClockEdit className="w-5 h-5 " />
                              }
                              name="Em andamento"
                            />
                          ) : (
                            <Tag
                              startContent={
                                <IconExclamationCircle className="w-5 h-5 text-red-500 dark:text-red-500" />
                              }
                              name="Video not found"
                            />
                          )}
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
                                description={"Ver a aula "}
                                startContent={
                                  <IconEye className="text-zinc-600" />
                                }
                              />
                              <Dropdown.Item
                                title="Editar a aula"
                                description={"Aperte para editar"}
                                startContent={
                                  <IconEdit className="text-zinc-600" />
                                }
                              />
                              <Dropdown.Item
                                title="Eliminar a aula"
                                onClick={() =>
                                  removeContent(
                                    lesson.id,
                                    lesson.title,
                                    "lesson",
                                  )
                                }
                                description={"Aperte para eliminar"}
                                startContent={
                                  <IconTrash className="text-red-500" />
                                }
                              />
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
                    <IconPresentation className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                    <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold">
                        Não há aulas neste momento{" "}
                      </span>
                      aperte pra adicionar.
                    </p>
                    <Link
                      href={`/dashboard/courses/${courseId}/${chapterId}/upload`}
                    >
                      <Tag name="Adicionar aulas" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      <Modal.Root isOpen={opened} onClose={() => close()}>
        <Modal.Content className="h-full p-0">
          <DeleteContent
            id={removableId}
            title={removableTitle}
            type={removableType}
          />
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
