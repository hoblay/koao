"use client";

import Tag from "@/app/components/Tag/Tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/app/components/Form";
import { trpc } from "@/app/_trpc/client";
import { CreateCourseSchema, TCreateCourseSchema } from "@/schemas";
import Courses from "./_components/Courses";
import { useState } from "react";




export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const createCourseForm = useForm<TCreateCourseSchema>({
    resolver: zodResolver(CreateCourseSchema)
  })
  const {formState: { isSubmitting}, handleSubmit, reset} = createCourseForm;

  const getCourse = trpc.course.getAllbyUser.useQuery()
  const createCourse = trpc.course.create.useMutation({
    onSettled: () => {
      getCourse.refetch()
    },
  })
  const onSubmit = async (data:TCreateCourseSchema) => {
    createCourse.mutate(data)
    reset()
    setModalOpen(false)
  }

  return (
    <div className="px-9 border-t border-t-zinc-900"> 
           
 
      <div className="md:px-16 py-8">
        <div className="flex gap-3">
          <h2 className="text-xl">Cursos</h2>
          <div className="" onClick={() => setModalOpen(true)}>
            <Tag  name="Criar novo curso " startContent={<PlusIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </div>
        </div>
        


        <Courses/>


        <div className="">
          <div className={`${!modalOpen ? 'hidden': '' } absolute z-30 bg-zinc-950/80 left-0 top-0 w-[100%] h-[100vh]  cursor-pointer`} onClick={() => setModalOpen(false)}></div>

          <div className={`z-40 fixed  w-full top-0 right-0 p-8 h-[100vh] bg-[#080808] border-r border-r-zinc-800 md:max-w-[421px] transition-all duration-500 transform ${modalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <FormProvider {...createCourseForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 p-4">
                <h2 className="text-2xl font-semibold">Criar um curso</h2>
                <span className="text-zinc-500 text-sm">Qual é que vai ser o titulo do Curso? Não te preocupes podes mudar o nome mais tarde.</span>
                <Form.Field className="flex flex-col gap-3 pt-4 relative">
                  <Form.Label htmlFor="title">
                    Titulo do curso
                  </Form.Label>
                  <Form.Input type="text" name="title" placeholder="Curso de comunicação social" className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 !dark:focus:bg-zinc-800/30"/>
                  <Form.ErrorMessage field="title"/> 
                </Form.Field>
              </div>
              <div className="flex justify-end gap-2 p-4">
                  <button className="p-2 items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md gap-2 text-xs" onClick={() => setModalOpen(false)} > <span className="">Cancelar</span>
                  </button>
                  <button disabled={isSubmitting} type="submit" className="p-2 items-center justify-center text-zinc-100 flex rounded-md gap-2 text-xs bg-[#015F43] hover:bg-[#224138]  disabled:bg-[#172d26]"> <span className="">Criar curso</span>
                  </button>
                </div>
            </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
