"use client"
import Tag from "@/app/components/Tag/Tag";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import {  IconCircleMinus, IconEdit, IconEditCircle, IconEye, IconFolderSearch, IconMovie, IconPhotoSearch, IconTag, IconTrash, IconUpload } from "@tabler/icons-react";
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
      {edit ? <h2 className="text-xl">Editar curso</h2> : <h2 className="text-xl">Curso</h2>}
        
      
        
        <div className="flex">
        <button className="px-3">
            <Tag  name="Previsualizar"  startContent={<IconEye className="text-zinc-500 w-5 h-5"/>}/>
          </button>
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
            <Tag  name="Editar curso"  startContent={<IconEdit className="text-zinc-500 w-5 h-5"/>}/>
          </button> }
          </div>
        </div>

        </div>
        <div className=" mt-4 flex gap-4  justify-between">
        
        <EditCourse courseId={course.data.id} edit={edit} setEdit={handleEdit}/>
        <div className="relative w-fit bg-zinc-900 shadow-md p-8 rounded-lg gap-4 flex flex-col">
        
            {course.data.imageUrl ? <Image src={course.data.imageUrl} className="rounded-xl" width={546} height={408} alt="course" unoptimized /> 
            : 
            <div className="max-w-[546px]">
            <div className="rounded-lg mt-2 w-full flex items-center justify-center ">
          <div className="flex items-center justify-center w-full " >
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[328px] border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-zinc-900 dark:bg-zinc-950 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-700 ">
                
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IconPhotoSearch className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                    <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Arraste a imagem aqui</span> ou clique para selecionar manualmente</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">PNG, JPEG, JPG, ou WEBP (MAX. 30MB)</p>
                  </div> 

               
                  
                  <input id="dropzone-file" type="file" className="hidden" />
              </label>
          </div> 
        
      </div>
            </div>
            
            }
            <div className="flex text-start items-start justify-start mt-4 ">
            <h2 className="text-xl font-semibold">Modulos</h2>
            </div>
          
            <Accordion.Root className="min-w-[546px] px-0">
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
    </div>
   );
}
 
export default CourseIdPage;