"use client";

import { Breadcrumb } from "@/app/components/Breadcrumb";

import { Dropdown } from "@/app/components/Dropdown";

import { Modal } from "@/app/components/Modal";

import {
  IconBookOff,
  IconDots,
  IconEdit,
  IconEye,
  IconLayoutGrid,
  IconTable,
  IconTrash,
} from "@tabler/icons-react";
import { DeleteContent } from "../../courses/[courseId]/_components/DeleteContent";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useState } from "react";

export function CategoriesViews({ categories }: { categories: any[] }) {
  const [removableId, setRemovableId] = useState("");
  const [removableTitle, setRemovableTitle] = useState("");

  const [opened, { open, close }] = useDisclosure();

  const removeCategory = (id: string, title: string) => {
    setRemovableId(id);
    setRemovableTitle(title);
    open();
  };
  return (
    <>
      <div className="flex flex-col pl-[256px]">
        <header className="w-full max-w-[1116px]  fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t p-4  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex justify-between  ">
            <Breadcrumb.RootA>
              <Breadcrumb.Item
                first
                href="/dashboard"
                title="Painel de controle"
              />
              <Breadcrumb.Item
                href="/dashboard/categories"
                title="Categorias"
              />
            </Breadcrumb.RootA>
            <div className="flex"></div>
          </div>
        </header>

        <div className="relative rounded-lg pt-[52px] w-full ">
          <table className="w-full min-w-[1116px]  text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
            <thead className="font-medium  bg-zinc-50  dark:bg-[#2a2a2a]  z-10 sticky top-[130px] text-zinc-700 dark:text-zinc-100 border border-[#1f1f1f]/10 dark:border-[#363636]">
              <tr className="items-center justify-center">
                <th scope="col" className="px-4 py-3 flex gap-4">
                  <input
                    type="checkbox"
                    value=""
                    className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                    name="checkAll"
                  />
                  <label htmlFor="checkAll">Categoria</label>
                </th>
                <th scope="col" className="px-12 py-3">
                  Numero de cursos
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            {categories.length > 0 && (
              <tbody>
                {categories.map((category, index) => (
                  <tr
                    className="border border-[#1f1f1f]/10 dark:border-[#363636] "
                    key={category.id}
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
                        <div className="flex flex-col w-full py-4">
                          <span className="text-base w-full truncate overflow-ellipsis">
                            {category.name}
                          </span>
                          <span className="text-sm text-zinc-500 truncate overflow-ellipsis">
                            {category.slug}
                          </span>
                        </div>
                      </div>
                    </th>

                    <td className="px-12">{category.courses.length} cursos</td>
                    <td className="px-7 text-right ">
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
                              description={"Ver a categoria "}
                              startContent={
                                <IconEye className="text-zinc-600" />
                              }
                            />
                            <Dropdown.Item
                              title="Editar"
                              description={"Aperte para editar"}
                              startContent={
                                <IconEdit className="text-zinc-600" />
                              }
                            />
                            <Dropdown.Item
                              title="Eliminar"
                              onClick={() =>
                                removeCategory(category.id, category.name)
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
            )}
          </table>
        </div>
      </div>
      <Modal.Root isOpen={opened} onClose={() => close()}>
        <Modal.Content className="h-full p-0">
          <DeleteContent
            id={removableId}
            title={removableTitle}
            type="category"
          />
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
