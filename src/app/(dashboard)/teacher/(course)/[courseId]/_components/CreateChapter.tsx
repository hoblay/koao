"use client";
import { trpc } from '@/app/_trpc/client';
import {  CreateChapterSchema, TCreateChapterschema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Form } from '@/app/components/Form';




function CreateChapter() {
  const [modalOpen, setModalOpen] = useState(false)
  const createChapterForm = useForm<TCreateChapterschema>({
    resolver: zodResolver(CreateChapterSchema)
  })
  const {control, register, formState: { isSubmitting}, handleSubmit, reset} = createChapterForm;

  const getCourse = trpc.course.getAllbyUser.useQuery()
  const createChapter = trpc.chapter.create.useMutation({
    onSettled: () => {
      getCourse.refetch()
    },
  })
  const onSubmit = async (data:TCreateChapterschema) => {
    createChapter.mutate(data)
    reset()

    
  }
 
  return (
    <div className="flex flex-col mt-6 w-full">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl">Adicionar modulo</h2>
        <FormProvider {...createChapterForm}>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <Form.Label htmlFor='title'>
                Titulo
              </Form.Label>
              <Form.Input name='title' type='text' className='w-full w-max-[100%]' />
              <Form.ErrorMessage field='title'/>
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='description'>
                Descriçao
              </Form.Label>
              <textarea   rows={4}  className=" p-2.5 justify-between w-full font-normal relative flex items-center shadow-sm px-3 gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-950/40 dark:focus:bg-zinc-950/40 min-h-36 rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 focus-visible:outline-none  data-[has-end-content=true]:pe-1.5 text-small dark:text-zinc-100" placeholder="Write your thoughts here..." />
              <Form.ErrorMessage field='description'/>
            </Form.Field>
            
            <div className="flex justify-end gap-2">
              <button className="p-2 items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md gap-2 text-xs"> <span className="">Cancelar</span>
              </button>
              <button type="submit" className="p-2 items-center justify-center text-zinc-100 flex rounded-md gap-2 text-xs bg-[#015F43] hover:bg-[#224138]  disabled:bg-[#172d26]"> <span className="">Adicionar modulo</span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default CreateChapter