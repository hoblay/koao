"use client";
import { trpc } from "@/app/_trpc/client";
import React, { useState } from "react";
import {
  IconBookOff,
  IconNotebookOff,
  IconPresentationOff,
  IconTagOff,
} from "@tabler/icons-react";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { deleteLesson } from "../[chapterId]/upload/_components/actions";

export function DeleteContent({
  type,
  id,
  title,
}: {
  type: "course" | "chapter" | "lesson" | "category";
  id: string;
  title: string;
}) {
  const [value, setValue] = useState("");
  const courses = trpc.course.getAllbyUser.useQuery();

  const router = useRouter();

  const deleteCourse = trpc.course.deleteCourse.useMutation({
    onSettled: () => {
      courses.refetch();
      router.push("/dashboard/courses");
    },
  });
  const deleteChapter = trpc.chapter.delete.useMutation({
    onSettled: () => {
      courses.refetch();
      router.push("/dashboard/courses");
    },
  });

  const deleteCategory = trpc.category.delete.useMutation({
    onSettled: () => {
      courses.refetch();
      router.push("/dashboard/courses");
    },
  });

  const removeCourse = (courseId: string) => {
    deleteCourse.mutate(courseId);
  };
  const removeChapter = (chapterId: string) => {
    deleteChapter.mutate(chapterId);
  };
  const removeLesson = async (lessonId: string) => {
    await deleteLesson(lessonId);
  };
  const removeCategory = (categoryId: string) => {
    deleteCategory.mutate(categoryId);
  };
  const deleteAction = () => {
    {
      type === "course"
        ? removeCourse(id)
        : type === "chapter"
          ? removeChapter(id)
          : type === "lesson"
            ? removeLesson(id)
            : removeCategory(id);
    }
  };

  const checkPhrase = (phrase: string) => {
    return phrase === title;
  };

  return (
    <div className="">
      {type === "course" ? (
        <IconBookOff className="size-8 text-red-600 absolute top-6 left-[200px]" />
      ) : type === "chapter" ? (
        <IconNotebookOff className="size-8 text-red-600 absolute top-6 left-[200px]" />
      ) : type === "lesson" ? (
        <IconPresentationOff className="size-8 text-red-600 absolute top-6 left-[200px]" />
      ) : (
        <IconTagOff className="size-8 text-red-600 absolute top-6 left-[200px]" />
      )}
      <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-4">
        <div className="flex flex-col gap-4 pt-4 relative">
          <h2 className="text-2xl font-semibold ">
            Desejas eliminar{" "}
            {type === "course"
              ? "o curso"
              : type === "chapter"
                ? "o modulo"
                : type === "lesson"
                  ? "a aula"
                  : "a categoria"}
            ?
          </h2>
          <span className="text-zinc-500 text-sm text-pretty">
            Como medida preventiva, pedimos que digite o nome:
            <p>{title}</p>
          </span>
          <input
            type="text"
            name="CourseName"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={title}
            className="max-h-12 text-sm w-full py-6 px-4 rounded-lg focus:ring-0 outline-none border border-[#1f1f1f]/10 dark:border-[#363636] p-2.5 justify-between font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#1f1f1f] dark:hover:bg-[#2d2d2d] dark:focus:bg-[#2d2d2d]"
          />
          <Button
            fullWidth
            size="lg"
            disabled={!checkPhrase(value)}
            onClick={() => deleteAction()}
          >
            <span className="text-base">Eliminar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
