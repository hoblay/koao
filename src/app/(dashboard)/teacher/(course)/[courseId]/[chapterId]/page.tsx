"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import { Dropdown } from "@/app/components/Dropdown";
import Tag from "@/app/components/Tag/Tag";
import { formatBytes } from "@/utils/format-bytes";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import { formatTime } from "@/utils/format-time";
import {
  IconBookUpload,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconExclamationCircle,
  IconFileExport,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { deleteLesson } from "./upload/_components/actions";

export default function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const chapter = trpc.chapter.getById.useQuery(params.chapterId);
  if (!chapter.data) return null;

  const removeLesson = async (id: string) => {
    const a = await deleteLesson(id);
    chapter.refetch();
  };
  return (
    <div className="px-24 py-8 border-t border-t-zinc-900">
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <div className="flex gap-3">
          <h2 className="text-xl">
            <Breadcrumb.Root
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </h2>
        </div>
        <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
          <Link href="/teacher/">
            <Tag
              name="Exportar "
              startContent={
                <IconFileExport className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </Link>
          <Link href={`/teacher/${params.courseId}/${params.chapterId}/upload`}>
            <Tag
              name="Adicionar aula"
              startContent={
                <IconBookUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </Link>
        </div>
      </div>

      <div className="relative shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
          <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
            <tr>
              <th scope="col" className="px-6 py-3 flex gap-4">
                <input
                  type="checkbox"
                  value=""
                  className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                  name="checkAll"
                />
                <label htmlFor="checkAll">Aula</label>
              </th>
              <th scope="col" className="px-6 py-3">
                Duração
              </th>
              <th scope="col" className="px-6 py-3">
                Tamanho
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Postado por
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {chapter.data.lessons.length > 0 && (
            <tbody>
              {chapter.data.lessons.map((lesson, index) => (
                <tr
                  className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2"
                  key={lesson.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white max-w-96 "
                  >
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        value=""
                        className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                      />
                      <div className="flex flex-col w-full py-4">
                        <span className="text-base w-full truncate overflow-ellipsis">
                          {lesson.title}
                        </span>
                        <span className="text-sm text-zinc-500 truncate overflow-ellipsis">
                          {lesson.id}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {lesson.video?.duration &&
                      formatSecondsToMinutes(lesson.video.duration)}
                  </td>
                  <td className="px-6 py-4">
                    {lesson.video?.sizeInBytes &&
                      formatBytes(lesson.video.sizeInBytes)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      {lesson.video?.id ? (
                        <Tag
                          startContent={
                            <IconClockEdit className="w-5 h-5 text-amber-950 dark:text-zinc-400" />
                          }
                          name="Em andamento"
                          color="warning"
                        />
                      ) : (
                        <Tag
                          startContent={
                            <IconExclamationCircle className="w-5 h-5 text-red-950 dark:text-zinc-400" />
                          }
                          name="Não foi possivel achar o video"
                          color="danger"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 relative ">
                      <Avatar
                        name={chapter.data?.course.author.name}
                        image={chapter.data?.course.author.image}
                        color="green"
                        size="xs"
                      />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 ">
                        {formatTime(new Date(lesson.updatedAt))}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown.Root>
                      <Dropdown.Trigger>
                        <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10">
                          <IconDots />
                        </button>
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="right-12">
                        <Dropdown.Section>
                          <Dropdown.Item
                            title="Editar a aula"
                            description={"Aperte para editar"}
                            startContent={
                              <IconEdit className="text-zinc-600" />
                            }
                          />
                          <Dropdown.Item
                            title="Eliminar a aula"
                            description={"Aperte para eliminar"}
                            startContent={
                              <IconTrash className="text-red-500" />
                            }
                            onClick={() => removeLesson(lesson.id)}
                          />
                        </Dropdown.Section>
                      </Dropdown.Menu>
                    </Dropdown.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
