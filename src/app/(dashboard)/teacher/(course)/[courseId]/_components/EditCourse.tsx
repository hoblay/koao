"use client";

import Tag from '@/app/components/Tag/Tag';
import { IconTag } from '@tabler/icons-react';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from '@/app/components/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateChapterFront, TCreateChaptersFront } from '@/schemas';
import { trpc } from '@/app/_trpc/client';

interface EditCourseProps {
  courseId: string,
  edit: boolean,
  setEdit: (value: boolean) => void
}




function EditCourse({courseId, edit, setEdit}:EditCourseProps) {
  const getCourse = trpc.course.getById.useQuery(courseId)
  const course = getCourse.data
  const updateCourse = trpc.course.updateCourse.useMutation({
    onSettled: () => {
      getCourse.refetch()
    },
  })
  const editCourseForm = useForm<TCreateChaptersFront>({
    resolver: zodResolver(CreateChapterFront),
    defaultValues: {
      title: course?.title,
      description: course?.description ? course.description : ''
    }
  })

 
  const {control, register, formState: { isSubmitting}, handleSubmit, reset} = editCourseForm;


   
   
  const onSubmit = async (data:TCreateChaptersFront) => {
    updateCourse.mutate({...data, courseId: courseId})

    
    setEdit(false)
    
  }

  if(!edit){
    return (
     
        <div className="flex flex-col gap-4 w-full bg-zinc-900 shadow-md p-8 rounded-lg">
        <div className="relative flex flex-col gap-2">
        <label className="text-lg font-semibold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
          Titulo
        </label>
        <p>{course?.title}</p>
        </div>
        <div className="relative flex flex-col gap-3">
        <label 
      className=" text-lg font-semibold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
        Categoria
      </label>
      <div className="flex">
              <Tag  name="Categoria" className="border border-zinc-800 border-dashed dark:bg-zinc-900 text-xs items-center justify-center" startContent={<IconTag className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
            </div>
        </div>
        <div className="relative flex flex-col gap-2">
        <label 
      className="text-lg font-semibold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">Descripcion</label>
        <p>{course?.description}</p>
        </div>
       
        </div>
    )
  }

return(
  <FormProvider {...editCourseForm}>
  <form className=" flex flex-col gap-4 w-full bg-zinc-900 shadow-md p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)} id='editCourse'>
      <Form.Field>
        <Form.Label htmlFor='title'>
          Titulo
        </Form.Label>
        
       <Form.Input name='title' type='text' className='w-full w-max-[100%]' /> 
        <Form.ErrorMessage field='title'/>
      </Form.Field>
      <div className="relative flex flex-col gap-3">
        <label className="text-sm text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
          Categoria
        </label>
        <div className="flex">
          <Tag  name="Categoria" className="border border-zinc-800 border-dashed dark:bg-zinc-900 text-xs items-center justify-center" startContent={<IconTag className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
        </div>
      </div>
      <Form.Field>
        <Form.Label htmlFor='description'>
          Descriçao
        </Form.Label>
        <textarea  id='description'  {...register('description')} rows={4}  className=" p-2.5 justify-between w-full font-normal relative flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-950/40 dark:focus:bg-zinc-950/40 min-h-[358px] rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none  data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100" placeholder="Escreva a descriçao" /> 
        
        
        <Form.ErrorMessage field='description'/>
      </Form.Field>
     
  </form>
</FormProvider>
  )
}

export default EditCourse