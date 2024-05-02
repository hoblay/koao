import Avatar from "@/app/components/Avatar/Avatar";
import Button from "@/app/components/Button/Button";
import { Dropdown } from "@/app/components/Dropdown";
import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";
import {
  IconBookOff,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  const chapters = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 7, 5, 4, 3, 2, 4, 5, 62, 45, 6, 2, 2,
  ];
  return (
    <table className="w-full  text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
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

      {chapters.length > 0 && (
        <tbody>
          {chapters.map((item, index) => (
            <tr
              className="border border-[#1f1f1f]/10 dark:border-[#363636] "
              key={index}
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
                  <Link href={`/dashboard/courses/curso-de-fundamentos`}>
                    <div className="flex flex-col w-full py-4">
                      <span className="text-base w-full truncate overflow-ellipsis">
                        Curso de fundamentos de inteligencia artificial
                      </span>
                      <span className="text-sm text-zinc-500 truncate overflow-ellipsis">
                        ascvdfa-asdfasdf-dfse3424-21dsa
                      </span>
                    </div>
                  </Link>
                </div>
              </th>
              <td className="px-12 text-nowrap">{item} horas</td>
              <td className="px-4 text-nowrap">
                {item + item * item + index * item * 10} MB
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
                  <Avatar name={"Winslet Mateus"} color="green" size="xs" />
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
                        startContent={<IconEye className="text-zinc-600" />}
                      />
                      <Dropdown.Item
                        title="Editar o curso"
                        description={"Aperte para editar"}
                        startContent={<IconEdit className="text-zinc-600" />}
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
                                Como medida preventiva, pedimos que digite o
                                nome: Curso de fundamentos de inteligencia
                                artificial.
                              </span>
                              <input
                                type="text"
                                name="CourseName"
                                placeholder="Curso de fundamentos de
                                inteligencia artificial"
                                className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none border border-[#1f1f1f]/10 dark:border-[#363636] p-2.5 justify-between font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#1f1f1f] dark:hover:bg-[#2d2d2d] dark:focus:bg-[#2d2d2d]"
                              />
                              <Button fullWidth size="lg">
                                <span className="text-base">Eliminar</span>
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
      )}
    </table>
  );
}
