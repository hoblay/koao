"use client";

import { trpc } from "@/app/_trpc/client";
import { Form } from "@/app/components/Form";
import Tag from "@/app/components/Tag/Tag";
import { CreateCategorySchema, TCreateCategorySchema } from "@/schemas";
import { toSlug } from "@/utils/text-to-slug";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconDots, IconFileExport, IconTagStarred } from "@tabler/icons-react";

import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const createCourseForm = useForm<TCreateCategorySchema>({
    resolver: zodResolver(CreateCategorySchema),
  });
  const {
    formState: { isSubmitting },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = createCourseForm;

  const getCategories = trpc.category.getAll.useQuery();
  const createCategory = trpc.category.create.useMutation({
    onSettled: () => {
      getCategories.refetch();
    },
  });
  const onSubmit = async (data: TCreateCategorySchema) => {
    createCategory.mutate(data);
    reset();
    setModalOpen(false);
  };

  let name = watch("categoryName");
  setValue("slug", toSlug(name));
  return (
    <div className="px-24 py-8 border-t border-t-zinc-900">
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <div className="flex gap-3">
          <h2 className="text-xl">Categorias</h2>
          <div className="" onClick={() => setModalOpen(true)}>
            <Tag
              name="Adicionar categoria"
              startContent={
                <IconTagStarred className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </div>
        </div>
        <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
          <Link href="/teacher/lesson">
            <Tag
              name="Exportar "
              startContent={
                <IconFileExport className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </Link>
        </div>
      </div>

      <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-4">
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
                <label htmlFor="checkAll">Categoria</label>
              </th>
              <th scope="col" className="px-6 py-3">
                Numero de cursos
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {getCategories?.data?.map((category) => (
              <tr
                className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2"
                key={category.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                    />
                    <div className="flex flex-col w-full py-4">
                      <span className="text-base w-full ">{category.name}</span>
                      <span className="text-sm text-zinc-500">
                        {category.slug}
                      </span>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  Em {category.courses.length} cursos
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10">
                    <IconDots />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="">
        <div
          className={`${!modalOpen ? "hidden" : ""} absolute z-30 bg-zinc-950/80 left-0 top-0 w-[100%] h-[100vh]  cursor-pointer`}
          onClick={() => setModalOpen(false)}
        ></div>
        <div
          className={`z-40 fixed  w-full top-0 right-0 p-8 h-[100vh] bg-[#080808] border-r border-r-zinc-800 max-w-[421px] transition-all duration-500 transform ${modalOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <FormProvider {...createCourseForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 p-4">
                <h2 className="text-2xl font-semibold">Criar uma categoria</h2>
                <span className="text-zinc-500 text-sm">
                  As categorias servem para catalogar os cursos com conceios
                  similares.
                </span>
                <Form.Field className="flex flex-col gap-3 pt-4 relative">
                  <Form.Label htmlFor="categoryName">
                    Nome da categoria
                  </Form.Label>
                  <Form.Input
                    type="text"
                    name="categoryName"
                    placeholder="Design grafico"
                    className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 !dark:focus:bg-zinc-800/30"
                  />
                  <Form.ErrorMessage field="categoryName" />
                </Form.Field>
                <Form.Field className="flex flex-col gap-3 pt-4 relative">
                  <Form.Label htmlFor="slug">Slug</Form.Label>
                  <Form.Input
                    type="text"
                    name="slug"
                    placeholder="design-grafico"
                    className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 !dark:focus:bg-zinc-800/30"
                  />
                  <Form.ErrorMessage field="slug" />
                </Form.Field>
              </div>
              <div className="flex justify-end gap-2 p-4">
                <button
                  className="p-2 items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md gap-2 text-xs"
                  onClick={() => setModalOpen(false)}
                >
                  {" "}
                  <span className="">Cancelar</span>
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="p-2 items-center justify-center text-zinc-100 flex rounded-md gap-2 text-xs bg-[#015F43] hover:bg-[#224138]  disabled:bg-[#172d26]"
                >
                  {" "}
                  <span className="">Criar curso</span>
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
