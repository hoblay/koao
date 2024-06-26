"use client";
import { trpc } from "@/app/_trpc/client";

import { Form } from "@/app/components/Form";

import Tag from "@/app/components/Tag/Tag";
import { CreateCategorySchema, TCreateCategorySchema } from "@/schemas";
import { toSlug } from "@/utils/text-to-slug";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  IconBook2,
  IconBookmarkPlus,
  IconChevronsDown,
  IconNotebook,
  IconPlus,
  IconSearch,
  IconTag,
  IconTagStarred,
  IconWand,
} from "@tabler/icons-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateChapter from "./CreateChapter";
import TagIcon from "@/app/components/Tag/TagIcon";
import SelectCategory from "./SelectCategory";

export function CourseSidebar({ courseId }: { courseId: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const course = trpc.course.getById.useQuery(courseId);

  return (
    <>
      <aside className="flex flex-col gap-2 max-w-[256px]  fixed  top-[78px] border-t border-r border-b border-[#1f1f1f]/10 dark:border-[#363636] min-h-[calc(100vh-78px)]">
        <header className="w-full bg-white dark:bg-[#2d2d2d] max-w-[256px] py-3.5 px-4  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex justify-between max-w-[250px] ">
            <div className="max-w-[250px] line-clamp-2 text-pretty overflow-hidden">
              {course.data ? (
                course.data.title
              ) : (
                <div className="h-4 bg-gray-300 rounded dark:bg-[#363636] w-36 animate-pulse"></div>
              )}
            </div>
          </div>
        </header>
        <div className="flex flex-col px-4 py-2 gap-2 max-w-[255px]">
          <button onClick={() => setDrawerOpen(!drawerOpen)}>
            <Tag
              name="Novo modulo"
              startContent={
                <IconNotebook className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </button>
          <SelectCategory
            categoryId={course.data?.category?.id}
            categoryName={course.data?.category?.name}
            courseId={courseId}
          />

          <form
            className={` relative w-full rounded-md border border-[#1f1f1f]/10 dark:border-[#363636] `}
          >
            <label className="text-sm font-medium text-zinc-900 sr-only dark:text-white">
              Pesquisar
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <IconSearch className="w-5 h-5 text-zinc-500 dark:text-zinc-400 " />
                </div>
              </div>
              <input
                type="search"
                className={`peer block w-full p-2 rounded-md  ps-9 text-xs text-zinc-600 placeholder:text-zinc-500 bg-zinc-50 outline-none  dark:bg-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f] dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white  transition-[border-rounded] ease-in duration-75 `}
                placeholder="Pesquisar na tabela..."
              />
              <div className="hidden absolute z-50 cursor-pointer hover:text-white  inset-y-0 end-0 items-center pe-2 pointer-events-none">
                <button type="button">
                  <IconChevronsDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400 " />
                </button>
              </div>
            </div>
          </form>
        </div>
      </aside>
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
