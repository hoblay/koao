"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";
import { Form } from "@/app/components/Form";

import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";
import { CreateCourseSchema, TCreateCourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  IconBook2,
  IconChevronsDown,
  IconClock,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconEye,
  IconLayoutBoard,
  IconLayoutGrid,
  IconLayoutList,
  IconNotebook,
  IconPlus,
  IconPresentation,
  IconSearch,
  IconTable,
  IconTableColumn,
  IconTableOff,
  IconTableRow,
  IconTemperatureSun,
  IconTrash,
  IconWand,
} from "@tabler/icons-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function CoursesSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const createCourseForm = useForm<TCreateCourseSchema>({
    resolver: zodResolver(CreateCourseSchema),
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = createCourseForm;

  const getCourse = trpc.course.getAllbyUser.useQuery();
  const createCourse = trpc.course.create.useMutation({
    onSettled: () => {
      getCourse.refetch();
    },
  });
  const onSubmit = async (data: TCreateCourseSchema) => {
    createCourse.mutate(data);
    reset();
    setDrawerOpen(false);
  };
  return (
    <>
      <aside className="lg:flex hidden flex-col gap-2 min-w-[256px] fixed  top-[78px] border-t border-r border-b border-[#1f1f1f]/10 dark:border-[#363636] min-h-[calc(100vh-78px)]">
        <header className="w-full bg-white dark:bg-[#2d2d2d] py-3.5 px-4  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex justify-between  ">
            Cursos
            <div className="flex"></div>
          </div>
        </header>
        <div className="flex flex-col px-4 py-2 gap-2">
          <button onClick={() => setDrawerOpen(!drawerOpen)}>
            <Tag
              name="Novo curso "
              startContent={
                <IconBook2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </button>
          <Tag
            name="Gerar com AI (Proximamente)"
            startContent={
              <IconWand className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            }
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
          className={`${!drawerOpen ? "hidden" : ""} absolute z-30 bg-[#161616]/75 left-0 top-0 w-[100%] h-[100%]  cursor-pointer`}
          onClick={() => setDrawerOpen(false)}
        ></div>

        <div
          className={`z-40 fixed  w-full top-0 right-0 h-[100vh] border border-[#1f1f1f]/10 dark:border-[#363636] bg-white dark:bg-[#2d2d2d] border-r border-r-zinc-800 md:max-w-[361px] transition-all duration-500 transform ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <FormProvider {...createCourseForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <div className="flex flex-col gap-1 border border-[#1f1f1f]/10 dark:border-[#363636] p-4">
                  <h2 className=" text-[17px] font-semibold ">
                    Criar um curso
                  </h2>
                  <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                    Qual é que vai ser o titulo do Curso? Não te preocupes podes
                    mudar o nome mais tarde.
                  </h3>
                </div>

                <Form.Field className="flex flex-col gap-3 p-4 relative">
                  <Form.Label htmlFor="title">Titulo do curso</Form.Label>
                  <Form.Input
                    type="text"
                    name="title"
                    placeholder="Curso de comunicação social"
                    className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 !dark:focus:bg-zinc-800/30"
                  />
                  <Form.ErrorMessage field="title" />
                </Form.Field>
              </div>
              <div className="flex justify-end gap-2 px-4">
                <button
                  className="p-2 items-center justify-center bg-zinc-200 dark:bg-[#363636] hover:opacity-80 dark:text-zinc-100 flex rounded-md gap-2 text-xs"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="">Cancelar</span>
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="p-2 items-center justify-center text-zinc-100 flex rounded-md gap-2 text-xs bg-[#015F43] hover:opacity-80  disabled:bg-[#172d26]"
                >
                  <span className="">Criar curso</span>
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
