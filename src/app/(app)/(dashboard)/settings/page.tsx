"use client";

import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";
import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  IconChevronsDown,
  IconClock,
  IconDots,
  IconEdit,
  IconEye,
  IconNotebook,
  IconPlus,
  IconPresentation,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";

export default function Home() {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 7, 5, 4, 3, 2, 4, 5, 62, 45, 6, 2, 2,
  ];
  return (
    <div className="flex pl-16 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <aside className="flex flex-col gap-2 min-w-[256px] p-4 fixed  top-[78px] border-t border-r border-b border-[#1f1f1f]/10 dark:border-[#363636] min-h-[calc(100vh-78px)]">
        <Tag
          name="Novo curso "
          startContent={
            <IconPlus className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
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
      </aside>
      <div className="flex flex-col pl-[256px]">
        <header className="w-full fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t p-4  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <Breadcrumb.RootA>
            <Breadcrumb.Item first title="Painel de controle" />
            <Breadcrumb.Item title="Cursos" />
          </Breadcrumb.RootA>
        </header>
        <div className="px-4 grid lg:grid-cols-3 pt-[70px] md:grid-cols-2 py-4 gap-4">
          {arr.map((item, index) => (
            <Card.Root
              key={index}
              bg={false}
              className="min-h-[206px] w-full border border-[#1f1f1f]/10 dark:border-[#363636]  rounded-lg justify-between flex flex-col"
            >
              <Card.Body className=" p-3 rounded-lg rounded-b-none flex items-start justify-between gap-3">
                <div className="flex flex-col gap-2 overflow-x-hidden">
                  <h4 className="text-base text-balance ">
                    Curso de fundamentos de inteligencia artificial
                  </h4>

                  <div className="flex gap-1">
                    <div className="flex gap-1">
                      <IconNotebook className="size-4 text-zinc-500 dark:text-zinc-400" />
                      <span className="text-xs ">8 Modulos ·</span>
                    </div>
                    <div className="flex gap-1">
                      <IconPresentation className="size-4 text-zinc-500 dark:text-zinc-400" />
                      <span className="text-xs ">43 Aulas ·</span>
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
                  <Dropdown.Menu className="top-10 -right-20">
                    <Dropdown.Section>
                      <Dropdown.Item
                        title="Previzualizar"
                        description={"Ver o curso "}
                        startContent={<IconEye className="text-zinc-600" />}
                      />
                      <Dropdown.Item
                        title="Editar o curso"
                        description={"Aperte para editar"}
                        startContent={<IconEdit className="text-zinc-600" />}
                      />
                      <Dropdown.Item
                        title="Eliminar o curso"
                        description={"Aperte para eliminar"}
                        startContent={<IconTrash className="text-red-500" />}
                      />
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown.Root>
              </Card.Body>
              <Card.Footer className="flex py-3 px-3 max-h-[56px] bg-zinc-100 dark:bg-[#1f1f1f]/40 rounded-b-lg">
                <div className="flex">
                  <div className="flex items-center space-x-2 relative ">
                    <Avatar name="Winslet Mateus" size="xs" color={"green"} />
                    <span className="text-xs text-zinc-700 dark:text-zinc-100">
                      Winslet Mateus
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 ">
                      atualizado há 50 minutos
                    </span>
                  </div>
                </div>
              </Card.Footer>
            </Card.Root>
          ))}
        </div>
      </div>
    </div>
  );
}
