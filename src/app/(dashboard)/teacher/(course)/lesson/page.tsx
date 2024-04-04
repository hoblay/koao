import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconBookUpload, IconCircleMinus, IconDots, IconFileExport, IconTags, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-24 py-8 border-t border-t-zinc-900"> 
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <div className="flex gap-3">
          <h2 className="text-xl">Aulas</h2>
          <Link href="/teacher/lesson/upload"><Tag  name="Adicionar aula" startContent={<IconBookUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/></Link> 
        </div>
        <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
        
          <Link href="/teacher/lesson">
            <Tag  name="Exportar " startContent={<IconFileExport className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
        </div> 
      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 flex gap-4">
                      <input type="checkbox" value="" className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer" name="checkAll"/>
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
              <tbody>
                  <tr className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2">
                      <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                        <div className="flex gap-4 items-center">
                        <input type="checkbox" value="" className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"/>
                          <div className="flex flex-col w-full py-4">
                            <span className="text-base w-full ">Curso a arte da mistura e masterização - Parte 1</span>
                            <span className="text-sm text-zinc-500">faba4daa-f7ef-483f-82ab-20f05d3d0de1</span>
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
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 relative ">
                          <span className="bg-zinc-300 w-6 h-6 rounded-full dark:bg-zinc-700"></span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 ">há 5 dias</span>
                        
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