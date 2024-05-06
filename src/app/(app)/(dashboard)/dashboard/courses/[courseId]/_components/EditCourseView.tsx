"use client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Button from "@/app/components/Button/Button";
import { Card } from "@/app/components/Card";
import { Dropdown } from "@/app/components/Dropdown";

import { Modal } from "@/app/components/Modal";
import Tag from "@/app/components/Tag/Tag";

import {
  IconBookOff,
  IconClockEdit,
  IconDots,
  IconEdit,
  IconEditCircle,
  IconEye,
  IconLayoutGrid,
  IconTable,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import EditCourse from "./EditCourse";
import AddImage from "./AddImage";
import AddCoverImage from "./AddCoverImage";
import { trpc } from "@/app/_trpc/client";
import { DeleteContent } from "./DeleteContent";
import { useDisclosure } from "@/hooks/useDisclosure";

export function EditCourseView({ courseId }: { courseId: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [opened, { open, close }] = useDisclosure();
  const course = trpc.course.getById.useQuery(courseId);
  if (!course.data) return null;

  return (
    <>
      <div className="flex flex-col pl-[256px]">
        <header className="w-full max-w-[1116px]  fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t px-4 py-2  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex justify-between  ">
            <Breadcrumb.RootA>
              <Breadcrumb.Item
                first
                href="/dashboard"
                title="Painel de controle"
              />
              <Breadcrumb.Item href="/dashboard/courses" title="Cursos" />
              <Breadcrumb.Item
                href={`/dashboard/courses/${courseId}`}
                title={`${course.data.title}`}
              />
            </Breadcrumb.RootA>
            <div className="flex gap-2 pr-4">
              <button onClick={() => open()}>
                <Tag
                  name="Eliminar"
                  startContent={<IconTrash className="text-red-500 w-5 h-5" />}
                />
              </button>
              <button type="submit" form="editCourse">
                <Tag
                  name="Adicionar mudanças"
                  startContent={
                    <IconEditCircle className="text-zinc-500 w-5 h-5" />
                  }
                />
              </button>
            </div>
          </div>
        </header>

        <div className="relative rounded-lg pt-[68px] w-full p-4 flex flex-col gap-3">
          <div className="">
            <AddCoverImage
              imageUrl={course.data.cover}
              edit={true}
              courseId={courseId}
            />
          </div>
          <div className="flex p-8 justify-between min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
            <EditCourse
              courseId={courseId}
              edit={true}
              setEdit={setDrawerOpen}
            />
            <AddImage
              imageUrl={course.data.imageUrl}
              edit={true}
              courseId={courseId}
            />
          </div>
        </div>
      </div>
      <Modal.Root isOpen={opened} onClose={() => close()}>
        <Modal.Content className="h-full p-0">
          <DeleteContent
            id={courseId}
            title={course.data.title}
            type="course"
          />
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
