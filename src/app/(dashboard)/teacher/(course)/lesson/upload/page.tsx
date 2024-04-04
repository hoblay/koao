import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconCircleMinus, IconDots, IconTags, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-24 py-8 border-t border-t-zinc-900"> 
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <h2 className="text-xl">Adicionar aulas</h2>
        <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
        <Link href="/teacher/create">
            <Tag  name="Apagar tudo" startContent={<IconCircleMinus className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
          <Link href="/teacher/create">
            <Tag  name="Adicionar tudo" startContent={<IconUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
        </div>
      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Aula
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
                          <span className="sr-only">Edit</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2">
                      <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                        <div className="flex gap-4">
                          <Image src={"https://www.filepicker.io/api/file/OTjVSdC5TxvppATpCNUI"} className=" object-cover rounded-lg" width={133} height={84} alt="course" unoptimized />
                          <div className="flex flex-col gap-2 w-full">
                            <input className="max-h-10 text-xs w-full p-3 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" value={"Curso a arte da mistura e masterização - Parte 1"} placeholder="Titulo da aula"/>
                            <div className="flex">
                              <Tag  name="Categoria" startContent={<IconTags className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
                            </div>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        12:37
                      </td>
                      <td className="px-6 py-4">
                        90.73 MB
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex">
                          <Tag  name="Pronto "/>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10"><IconDots /></button>
                      </td> 
                  </tr>
                  
                  
              </tbody>
          </table>
      </div>

 
      
    </div>
  );
}
