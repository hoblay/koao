"use client";

import Tag from "@/app/components/Tag/Tag";
import { IconBookUpload, IconCircleMinus, IconDots, IconFileExport, IconNotebook, IconTagStarred, IconTags, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="px-24 py-8 border-t border-t-zinc-900"> 
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <div className="flex gap-3">
          <h2 className="text-xl">Categorias</h2>
          <div className="" onClick={() => setModalOpen(true)}>
            <Tag  name="Adicionar categoria" startContent={<IconTagStarred className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </div>
        </div> 
        <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
        
          <Link href="/teacher/lesson">
            <Tag  name="Exportar " startContent={<IconFileExport className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
        </div> 
      </div>


      <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 flex gap-4">
                      <input type="checkbox" value="" className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer" name="checkAll"/>
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
                  <tr className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2">
                      <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                        <div className="flex gap-4 items-center">
                        <input type="checkbox" value="" className="w-4 h-4 accent-[#015F43] text-[#015F43] bg-zinc-100 border-zinc-300 rounded focus:ring-[#2e7862] dark:focus:ring-[#015F43] dark:ring-offset-zinc-900 focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"/>
                          <div className="flex flex-col w-full py-4">
                            <span className="text-base w-full ">Programação</span>
                            <span className="text-sm text-zinc-500">faba4daa-f7ef-483f-82ab-20f05d3d0de1</span>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        Em 23 cursos
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10"><IconDots /></button>
                      </td> 
                  </tr>
                  
                  
              </tbody>
          </table>
      </div>

      <div className="">
          <div className={`${!modalOpen ? 'hidden': '' } absolute z-30 bg-zinc-950/80 left-0 top-0 w-[100%] h-[100vh]  cursor-pointer`} onClick={() => setModalOpen(false)}></div>
          <div className={`z-40 fixed  w-full top-0 right-0 p-8 h-[100vh] bg-[#080808] border-r border-r-zinc-800 max-w-[421px] transition-all duration-500 transform ${modalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div className="flex flex-col gap-3 p-4">
              <h2 className="text-2xl font-semibold">Criar um categoria</h2>
              <span className="text-zinc-500">As categorias servem para catalogar os cursos com conceios similares.</span>
              <div className="flex flex-col gap-4">
                <input className="max-h-12 text-sm w-full p-6 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" placeholder="Nome da categoria"/>
                <input className="max-h-12 text-sm w-full p-6 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" placeholder="Slug"/>
                <div className="flex justify-end gap-2">
                  <button className="p-2 items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md gap-2 text-xs" onClick={() => setModalOpen(false)} > <span className="">Cancelar</span>
                  </button>
                  <button className="p-2 items-center justify-center text-zinc-100 flex rounded-md gap-2 text-xs bg-[#015F43] hover:bg-[#224138]  disabled:bg-[#172d26]"> <span className="">Adicionar categoria</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}
