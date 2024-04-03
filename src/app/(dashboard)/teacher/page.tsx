import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconDots } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-9"> 
           
 
      <div className="px-16 py-8">
        <div className="flex gap-3">
          <h2 className="text-xl">Cursos</h2>
          <Link href="/teacher/create"><Tag  name="Criar novo curso " startContent={<PlusIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/></Link>
        </div>
        <div className="grid grid-cols-3 py-6 gap-4">
          <div className="max-w-[390px] w-full border border-zinc-900 rounded-2xl">
            <div className="dark:bg-zinc-900 p-5 rounded-2xl rounded-b-none flex items-start justify-between gap-3 pb-12">
              <div className="flex flex-col gap-2">
                <h4>Curso a arte da mistura e masterização - Parte 1</h4>
                <span className="text-zinc-500">232 videos · 65GB storage</span>
              </div>
              <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10"><IconDots /></button>
            </div>
            <div className="flex py-4 px-5">
              <div className="flex">
              <div className="flex items-center space-x-2 relative ">
                <span className="bg-zinc-300 w-4 h-4 rounded-full dark:bg-zinc-700"></span>
                <span className="text-xs text-zinc-700 dark:text-zinc-100">Winslet Mateus</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 ">uploaded 3 videos an hour ago</span>
              
              </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}