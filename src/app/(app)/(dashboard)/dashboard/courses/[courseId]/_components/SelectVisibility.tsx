"use client";

import { trpc } from "@/app/_trpc/client";
import TagIcon from "@/app/components/Tag/TagIcon";
import { TAddCategoryToCourseSchema } from "@/schemas";
import { IconEye, IconEyeClosed, IconEyeX, IconTag } from "@tabler/icons-react";
import { useState } from "react";

interface SelectVisibilityProps {
  published?: string;
  type: "course" | "chapter" | "lesson";
  id: string;
}

function SelectVisibility({
  published = "false",
  id,
  type,
}: SelectVisibilityProps) {
  const [value, setValue] = useState(published);
  const [text, setText] = useState("false");
  const changeCourseVisibility = trpc.course.changeVisibility.useMutation();
  const course = trpc.course.getById.useQuery(id);

  const changeVisibility = (value: string) => {
    type === "course" &&
      changeCourseVisibility.mutate({
        id,
        isPublished: value === "false" ? false : true,
      });

    setValue(value);
  };

  return (
    <div className="flex relative group cursor-pointer">
      {value === "false" ? (
        <IconEyeClosed className="z-10 dark:group-hover:text-white absolute left-2.5 bottom-1.5 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ) : (
        <IconEye className="z-10 dark:group-hover:text-white absolute left-2.5 bottom-1.5 w-5 h-5 text-zinc-500 dark:text-zinc-300" />
      )}
      <select
        id="countries"
        value={value}
        onChange={(e) => changeVisibility(e.target.value)}
        className={`${value === "false" ? "dark:bg-[#2a2a2a] border-dashed dark:text-zinc-400" : "dark:bg-[#363636]/60 border dark:text-white"} focus:border-dashed relative flex gap-2 select-none items-center whitespace-nowrap px-[10px] py-2 bg-[#363636]/10 text-zinc-500  hover:bg-[#363636]/20 hover:dark:bg-[#2d2d2d] hover:text-[#363636] dark:hover:text-white cursor-pointer appearance-none ps-[37px] bg-zinc-50 text-xs border border-[#1f1f1f]/10 dark:border-[#363636]   rounded-lg focus:dark:bg-[#2a2a2a] focus:ring-[#363636] focus:border-[#363636] w-full dark:placeholder-zinc-400 dark:text-white dark:focus:ring-[#363636] dark:focus:border-[#363636] outline-none`}
      >
        <option value={"true"}>Publico</option>

        <option selected value={"false"}>
          Privado
        </option>
      </select>
    </div>
  );
}

export default SelectVisibility;
