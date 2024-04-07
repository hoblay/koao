"use client"
import Tag from "@/app/components/Tag/Tag";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import {  IconCircleMinus, IconEdit, IconEditCircle, IconTag, IconTrash, IconUpload } from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import CreateChapter from "./_components/CreateChapter";
import { Accordion } from "@/app/components/Accordion";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { TCreateChaptersFront, CreateChapterFront } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EditCourse from "./_components/EditCourse";
import { useState } from "react";

const CourseIdPage =  ({
  params
}: {
  params: { courseId: string }
}) => {
  
const [edit, setEdit] = useState(true)

  


  
  const course = trpc.course.getById.useQuery(params.courseId) 
  if (!course.data) {
    return null
  }
const handleEdit = (value:boolean) => {
  setEdit(value)
}



  return (
    <div className="px-24 py-8 border-t border-t-zinc-900">
     <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
      <h2 className="text-xl">Editar curso</h2>
          <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
            <button 
              >
              <Tag  name="Eliminar curso"  startContent={<IconTrash className="text-red-500 w-5 h-5"/>}/>
            </button>
            {edit && (<button type="submit" form="editCourse" 
              >
              <Tag  name="Adicionar mudanças" startContent={<IconEditCircle className="text-zinc-500 w-5 h-5"/>}/>
            </button>)
            }{!edit && <button onClick={() => setEdit(true)}
            >
            <Tag  name="Editar o curso"  startContent={<IconEdit className="text-zinc-500 w-5 h-5"/>}/>
          </button> }
          </div>
        
        </div>
        <div className=" mt-4 flex gap-4  justify-between">
        
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
            {edit && (
              <Accordion.Item title="Adicionar modulos" index={99}>
              <div className="px-4">
                <CreateChapter courseId={course.data.id}/>
              </div>
            </Accordion.Item>
            )}
          </Accordion.Root>
          
        </div>
        </div>
        <EditCourse courseId={course.data.id} edit={edit} setEdit={handleEdit}/>


        
        </div>
    </div>
   );
}
 
export default CourseIdPage;