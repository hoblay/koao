"use client";
import React, { SyntheticEvent, useState } from "react";

import { formatBytes } from "@/utils/format-bytes";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import Tag from "@/app/components/Tag/Tag";
import {
  IconDots,
  IconTrash,
  IconEdit,
  IconFiles,
  IconLoader3,
  IconCircleCheck,
} from "@tabler/icons-react";
import { Dropdown } from "@/app/components/Dropdown";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/app/components/Form";
import { trpc } from "@/app/_trpc/client";
import { TUpdateLessonTitleSchema, UpdateLessonTitleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface LessonVideo {
  name: string;
  src: string;
  size: number;
  type: string;
  duration: string;
  lessonId: string;
  videoId: string;
}

function TableRow({
  file,
  onClick,
  loading,
}: {
  file: LessonVideo;
  onClick: any;
  loading: boolean;
}) {
  const [duration, setDuration] = useState("");
  const updateVideo = trpc.lesson.updateVideoDuration.useMutation();
  const updateLesson = trpc.lesson.updateLessonTitle.useMutation();
  const lessonForm = useForm({
    resolver: zodResolver(UpdateLessonTitleSchema),
    defaultValues: {
      title: file?.name,
      lessonId: file.lessonId,
    },
  });

  const { handleSubmit } = lessonForm;
  const updateDuration = (duration: number) => {
    setDuration(formatSecondsToMinutes(duration));
    updateVideo.mutate({ videoId: file.videoId, duration });
  };

  function handleLoadedMetadata(event: SyntheticEvent<HTMLVideoElement>) {
    updateDuration(event.currentTarget.duration);
  }

  const onSubmit = async (data: TUpdateLessonTitleSchema) => {
    updateLesson.mutate(data);
  };
  return (
    <tr
      className="border border-[#1f1f1f]/10 dark:border-[#363636] "
      key={file.name}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex gap-4">
          <video
            src={file?.src}
            controls={false}
            className="pointer-events-none aspect-video rounded-md"
            preload="metadata"
            onLoadedMetadata={(event) => handleLoadedMetadata(event)}
            width={133}
            height={84}
            typeof={file.type}
            style={{ objectFit: "cover" }}
          />
          <FormProvider {...lessonForm}>
            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Form.Field>
                <Form.Input
                  name="title"
                  sizes="xs"
                  type="text"
                  className="max-w-[380px]"
                  onBlur={handleSubmit(onSubmit)}
                />
              </Form.Field>
              <div className="flex">
                <Tag
                  name="Recursos"
                  className=" border-dashed dark:bg-[#2a2a2a] text-xs items-center justify-center"
                  startContent={
                    <IconFiles className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  }
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </th>
      <td className="px-6 py-4">{duration}</td>
      <td className="px-6 py-4">{formatBytes(file.size)}</td>
      <td className="px-6 py-4">
        <div className="flex">
          {loading ? (
            <Tag
              name="Verificando"
              color="warning"
              startContent={
                <IconLoader3 className="w-5 h-5 animate-spin text-amber-500 dark:text-amber-500 group-hover:text-amber-300" />
              }
            />
          ) : (
            <Tag
              name="Verificado"
              color="success"
              startContent={
                <IconCircleCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-500 group-hover:text-emerald-300 " />
              }
            />
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]">
              <IconDots />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Section>
              <Dropdown.Item
                title="Editar a aula"
                description={"Aperte para editar"}
                startContent={<IconEdit className="text-zinc-600" />}
                onClick={() => console.log("Editar: ", file.name)}
              />
              <Dropdown.Item
                title="Eliminar a aula"
                description={"Aperte para eliminar"}
                startContent={<IconTrash className="text-red-500" />}
                onClick={() => onClick(file.lessonId)}
              />
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Root>
      </td>
    </tr>
  );
}

export default TableRow;
