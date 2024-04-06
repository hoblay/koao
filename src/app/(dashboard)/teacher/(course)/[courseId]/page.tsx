"use client"
import Tag from "@/app/components/Tag/Tag";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import {  IconCircleMinus, IconTag, IconUpload } from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import CreateChapter from "./_components/CreateChapter";
import { Accordion } from "@/app/components/Accordion";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

const CourseIdPage =  ({
  params
}: {
  params: { courseId: string }
}) => {
  


  const course = trpc.course.getById.useQuery(params.courseId) 


  if (!course.data) {
    return null
  }



  return (
    <div className="px-24 py-8 border-t border-t-zinc-900">
     <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
      <h2 className="text-xl">Editar curso</h2>
          <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
          <button > 
              <Tag  name="Apagar tudo" startContent={<IconCircleMinus className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
        </button> 
            <button 
              >
              <Tag  name="Adicionar tudo" startContent={<IconUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
            </button>
          </div>
        
        </div>
        <div className=" mt-4 flex gap-4  justify-between">
      <form className=" w-full ">
        <div className="flex flex-col gap-4 w-full bg-zinc-900 shadow-md p-8 rounded-lg">
        <div className="relative flex flex-col gap-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
          Titulo
        </label>
        <input className={` justify-between w-full font-normal relative flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-950/40 dark:focus:bg-zinc-950/40 h-[53px] min-h-12 rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none  data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100`} value={course.data.title} />
        </div>
        <div className="relative flex flex-col gap-3">
        <label 
      className="text-sm text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
        Categoria
      </label>
      <div className="flex">
              <Tag  name="Categoria" className="border border-zinc-800 border-dashed dark:bg-zinc-900 text-xs items-center justify-center" startContent={<IconTag className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
            </div>
        </div>
        <div className="relative flex flex-col gap-2">
        <label 
      className="text-sm text-zinc-600 dark:text-zinc-300 flex items-center justify-between">Descripcion</label>
        <textarea id="message" rows={4} className=" p-2.5 justify-between w-full font-normal relative flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-950/40 dark:focus:bg-zinc-950/40 min-h-[258px] rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none  data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100" placeholder="Write your thoughts here..."></textarea>
        </div>
        </div>
        </form>
        <div className="flex w-full  ">
        <div className="relative w-full bg-zinc-900 shadow-md p-8 rounded-lg gap-3">
          <Image src={"https://miro.medium.com/v2/resize:fit:1280/format:webp/1*SL4sWHdjGR3vo0x5ta3xfw.jpeg"} className="rounded-xl" width={536} height={408} alt="course" unoptimized />
          
          
            <Accordion.Root className="min-w-[530px] mt-4">
            {course.data.chapters.map((chapter, index) => (
              <Accordion.Item title={chapter.title} key={chapter.id} index={index}>
                <div className="p-4">{chapter.description}...
                  <Link className="text-green-600 p-5 hover:text-green-500" href={`/teacher/${params.courseId}/${chapter.id}`}>Ver mais</Link>
                </div>
              </Accordion.Item>
              
            ))}
            <Accordion.Item title="Adicionar modulos" index={99}>
              <div className="px-4">
                <CreateChapter courseId={course.data.id}/>
              </div>
            </Accordion.Item>
          </Accordion.Root>
          
        </div>
        </div>
        </div>
    </div>
   );
}
 
export default CourseIdPage;