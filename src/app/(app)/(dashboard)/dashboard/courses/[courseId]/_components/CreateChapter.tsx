"use client";
import { trpc } from "@/app/_trpc/client";
import {
  CreateChapterFront,
  CreateChapterSchema,
  TCreateChaptersFront,
  TCreateChapterschema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Form } from "@/app/components/Form";

function CreateChapter({ courseId }: { courseId: string }) {
  const createChapterForm = useForm<TCreateChaptersFront>({
    resolver: zodResolver(CreateChapterFront),
  });
  const {
    control,
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = createChapterForm;

  const getCourse = trpc.course.getById.useQuery(courseId);
  const createChapter = trpc.chapter.create.useMutation({
    onSettled: () => {
      getCourse.refetch();
    },
  });
  const onSubmit = async (data: TCreateChaptersFront) => {
    createChapter.mutate({ ...data, courseId });
    reset();
  };

  return (
    <div className="flex flex-col  w-full">
      <div className="flex flex-col gap-4 w-full">
        <FormProvider {...createChapterForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Field>
              <Form.Label htmlFor="title">Titulo</Form.Label>
              <Form.Input
                name="title"
                type="text"
                placeholder="Introdução ao Photoshop"
                className="w-full w-max-[100%]"
              />
              <Form.ErrorMessage field="title" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="description">Descriçao</Form.Label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                className=" p-2.5 justify-between w-fulljustify-between w-full font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#363636] border border-[#1f1f1f]/10 dark:border-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f]   rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100"
                placeholder="Escreva a descriçao do modulo..."
              />
              <Form.ErrorMessage field="description" />
            </Form.Field>

            <div className="flex justify-end gap-2">
              <button className="p-2 items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md gap-2 text-xs">
                {" "}
                <span className="">Cancelar</span>
              </button>
              <button
                type="submit"
                className="p-2 items-center justify-center text-zinc-100 flex rounded-md gap-2 text-xs bg-[#015F43] hover:bg-[#224138]  disabled:bg-[#172d26]"
              >
                {" "}
                <span className="">Adicionar modulo</span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default CreateChapter;
