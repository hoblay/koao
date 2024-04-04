"use client";

import { Card } from "@/app/components/Card";
import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconDots, IconNotebook } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="px-9 border-t border-t-zinc-900"> 
           
 
      <div className="px-16 py-8">
        <div className="flex gap-3">
          <h2 className="text-xl">Cursos</h2>
          <div className="" onClick={() => setModalOpen(true)}>
            <Tag  name="Criar novo curso " startContent={<PlusIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </div>
        </div>
        <div className="grid grid-cols-3 py-6 gap-4">
          <Card.Root className="max-w-[390px] min-h-[206px] w-full border border-zinc-900 bg-zinc-900 rounded-2xl justify-between flex flex-col">
            <Card.Body className="dark:bg-zinc-900 p-5 rounded-2xl rounded-b-none flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <Link href="/teacher/lesson"><h4>Curso a arte da mistura e masterização - Parte 1</h4></Link>
                <span className="text-zinc-500">232 videos · 65GB storage</span>
              </div>
              <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10"><IconDots /></button>
            </Card.Body>
            <Card.Footer className="flex py-4 px-5 max-h-[56px] bg-zinc-950/40 rounded-b-2xl">
              <div className="flex">
              <div className="flex items-center space-x-2 relative ">
                <span className="bg-zinc-300 w-6 h-6 rounded-full dark:bg-zinc-700"></span>
                <span className="text-xs text-zinc-700 dark:text-zinc-100">Winslet Mateus</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 ">uploaded 3 videos an hour ago</span>
              
              </div>
              </div>
            </Card.Footer>
          </Card.Root>
          
        </div>
        <div className={`${!modalOpen ? 'hidden': 'block' } transition-all duration-300 ease-in`}>
          <div className="absolute z-30 bg-zinc-950/80 left-0 top-0 w-[100%] h-[100vh]  cursor-pointer" onClick={() => setModalOpen(false)}></div>
          <div className="z-40 fixed max-w-[421px] w-full top-0 right-0 p-8 h-[100vh] bg-[#080808] border-r border-r-zinc-800">
            
            <div className="flex flex-col gap-3 p-4">
              <h2 className="text-2xl font-semibold">Criar um curso</h2>
              <span className="text-zinc-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem.</span>
              <input className="max-h-12 text-sm w-full p-6 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" placeholder="Nome do curso"/>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <h2 className="text-xl">Adiciona modulos</h2>
              <input className="max-h-12 text-sm w-full p-6 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" placeholder="Titulo do modulo"/>
              <div className="flex justify-end">
                <button className="p-2 items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md gap-2 text-xs"> <span className="">Adicionar modulo</span> <IconNotebook className="w-4 h-4" /> 
                </button>
              </div>
            </div>
            <div className="p-4">
            <button type="submit" className="bg-[#015F43] w-full text-white rounded p-3 text-sm font-semibold hover:bg-[#224138] flex justify-center items-center disabled:bg-[#172d26]">Criar curso</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
