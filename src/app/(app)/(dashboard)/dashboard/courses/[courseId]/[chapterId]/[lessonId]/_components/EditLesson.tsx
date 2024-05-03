"use client";

import Tag from "@/app/components/Tag/Tag";
import { IconTag } from "@tabler/icons-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Form } from "@/app/components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateChapterFront, TCreateChaptersFront } from "@/schemas";
import { trpc } from "@/app/_trpc/client";

interface EditLessonProps {
  lessonId: string;
  edit: boolean;
}

function EditLesson({ lessonId, edit }: EditLessonProps) {
  const getLesson = trpc.lesson.getById.useQuery(lessonId);
  const lesson = getLesson.data;
  const updateLesson = trpc.lesson.updateLesson.useMutation({
    onSettled: () => {
      getLesson.refetch();
    },
  });
  const editLessonForm = useForm<TCreateChaptersFront>({
    resolver: zodResolver(CreateChapterFront),
    defaultValues: {
      title: lesson?.title,
      description: lesson?.description ? lesson.description : "",
    },
  });

  const {
    control,
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = editLessonForm;

  const onSubmit = async (data: TCreateChaptersFront) => {
    updateLesson.mutate({ ...data, lessonId: lessonId });
  };

  if (!edit) {
    return (
      <div className="flex flex-col gap-4 bg-zinc-900 shadow-md p-8 rounded-lg">
        <div className="relative flex flex-col gap-2">
          <label className="text-lg font-semibold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
            Titulo
          </label>
          <p>{lesson?.title}</p>
        </div>
        <div className="relative flex flex-col gap-3">
          <label className=" text-lg font-semibold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
            Categoria
          </label>
          <div className="flex">
            <Tag
              name="Categoria"
              className="border border-zinc-800 border-dashed dark:bg-zinc-900 text-xs items-center justify-center"
              startContent={
                <IconTag className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-2">
          <label className="text-lg font-semibold text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
            Descripcion
          </label>
          <p>{lesson?.description}</p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...editLessonForm}>
      <form
        className=" flex flex-col gap-4 w-full rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
        id="editLesson"
      >
        <Form.Field>
          <Form.Label htmlFor="title">Titulo</Form.Label>

          <Form.Input
            name="title"
            type="text"
            className="w-full w-max-[100%]"
            placeholder="Curso intensivo de photoshop"
          />
          <Form.ErrorMessage field="title" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="description">Descriçao</Form.Label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className=" min-h-[188px]  p-2.5 justify-between w-full font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#363636] border border-[#1f1f1f]/10 dark:border-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f]   rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100"
            placeholder="Escreva a descriçao"
          />

          <Form.ErrorMessage field="description" />
        </Form.Field>
      </form>
    </FormProvider>
  );
}

export default EditLesson;
