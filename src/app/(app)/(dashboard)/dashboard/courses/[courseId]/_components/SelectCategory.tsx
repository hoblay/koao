"use client";

import { trpc } from "@/app/_trpc/client";
import TagIcon from "@/app/components/Tag/TagIcon";
import { TAddCategoryToCourseSchema } from "@/schemas";
import { IconTag } from "@tabler/icons-react";
import { useState } from "react";

interface SelectCategoryProps {
  categoryId?: string;
  categoryName?: string;
  courseId: string;
}

function SelectCategory({
  categoryName = "Categoria",
  categoryId = "Categoria",
  courseId,
}: SelectCategoryProps) {
  const [value, setValue] = useState(categoryId);
  const [text, setText] = useState(categoryName);
  const categories = trpc.category.getAll.useQuery();
  const addToCourse = trpc.category.addtoCourse.useMutation();
  const course = trpc.course.getById.useQuery(courseId);
  if (!categories.data) return null;

  const changeCategory = (data: TAddCategoryToCourseSchema, name: string) => {
    if (data.categoryId !== "Categoria") {
      addToCourse.mutate(data, {
        onSettled: () => {
          course.refetch();
        },
      });
    }
    setValue(data.categoryId);
    setText(name);
  };

  return (
    <div className="flex relative group cursor-pointer">
      {text === "Categoria" ? (
        <IconTag className="z-10 dark:group-hover:text-white absolute left-2.5 bottom-1.5 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ) : (
        <span className="z-10 dark:group-hover:text-white absolute left-2.5 bottom-1.5 w-5 h-5 text-zinc-500 dark:text-zinc-400">
          <TagIcon name={text} />
        </span>
      )}
      <select
        id="countries"
        value={value}
        onChange={(e) =>
          changeCategory(
            { courseId, categoryId: e.target.value },
            e.target.options[e.target.selectedIndex].text,
          )
        }
        className={`${value === "Categoria" ? "dark:bg-[#2a2a2a] border-dashed" : "dark:bg-[#363636]/60 border"} focus:border-dashed relative flex gap-2 select-none items-center whitespace-nowrap px-[10px] py-2 bg-[#363636]/10 text-zinc-500  hover:bg-[#363636]/20 hover:dark:bg-[#2d2d2d] hover:text-[#363636] dark:hover:text-white cursor-pointer appearance-none ps-[37px] bg-zinc-50 text-xs border border-[#1f1f1f]/10 dark:border-[#363636] outline-none   rounded-lg focus:dark:bg-[#2a2a2a] focus:ring-[#363636] focus:border-[#363636] w-full dark:placeholder-zinc-400 dark:text-white dark:focus:ring-[#363636] dark:focus:border-[#363636]`}
      >
        <option selected value="Categoria">
          Categoria
        </option>
        {categories.data.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCategory;
