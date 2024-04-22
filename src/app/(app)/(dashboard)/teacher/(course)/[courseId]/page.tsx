"use client";
import Tag from "@/app/components/Tag/Tag";
import {
  IconCircleMinus,
  IconEdit,
  IconEditCircle,
  IconEye,
  IconFolderSearch,
  IconMovie,
  IconPhotoSearch,
  IconTag,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import CreateChapter from "./_components/CreateChapter";
import { Accordion } from "@/app/components/Accordion";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import EditCourse from "./_components/EditCourse";
import { useState } from "react";
import AddImage from "./_components/AddImage";
import { Breadcrumb } from "@/app/components/Breadcrumb";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const [edit, setEdit] = useState(true);

  const course = trpc.course.getById.useQuery(params.courseId);
  if (!course.data) {
    return null;
  }
  const handleEdit = (value: boolean) => {
    setEdit(value);
  };

  return (
    <div className="px-24 py-8 border-t border-t-zinc-900">
      <div className="flex items-center justify-between border-b border-b-zinc-900 py-4 px-4">
        <Breadcrumb.Root courseId={params.courseId} />

        <div className="flex">
          <button className="px-3">
            <Tag
              name="Previsualizar"
              startContent={<IconEye className="text-zinc-500 w-5 h-5" />}
            />
          </button>
          <div className="flex gap-1.5 pl-3 border-l border-l-zinc-900">
            <button>
              <Tag
                name="Eliminar curso"
                startContent={<IconTrash className="text-red-500 w-5 h-5" />}
              />
            </button>
            {edit && (
              <button type="submit" form="editCourse">
                <Tag
                  name="Adicionar mudanças"
                  startContent={
                    <IconEditCircle className="text-zinc-500 w-5 h-5" />
                  }
                />
              </button>
            )}
            {!edit && (
              <button onClick={() => setEdit(true)}>
                <Tag
                  name="Editar curso"
                  startContent={<IconEdit className="text-zinc-500 w-5 h-5" />}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-4 lg:flex gap-4  justify-between">
        <EditCourse
          courseId={course.data.id}
          edit={edit}
          setEdit={handleEdit}
        />
        <div className="flex-1 relative w-fit bg-zinc-900 shadow-md p-8 rounded-lg gap-4 flex flex-col">
          <AddImage
            imageUrl={course.data.imageUrl}
            edit={edit}
            courseId={course.data.id}
          />
          <div className="flex text-start items-start justify-start mt-4 ">
            <h2 className="text-xl font-semibold">Modulos</h2>
          </div>

          <Accordion.Root className="min-w-[546px] px-0 py-0 bg-zinc-800/40 gap-0 flex flex-col divide-y-4 divide-zinc-900">
            {course.data.chapters.map((chapter, index) => (
              <Accordion.Item
                title={chapter.title}
                key={chapter.id}
                index={index}
              >
                <div className="p-4">
                  {chapter.description}...
                  <Link
                    className="text-green-600 p-2 hover:text-green-500"
                    href={`/teacher/${params.courseId}/${chapter.id}`}
                  >
                    Ver mais
                  </Link>
                </div>
              </Accordion.Item>
            ))}
            {edit && (
              <Accordion.Item title="Adicionar modulos" index={99}>
                <div className="px-4 pb-4">
                  <CreateChapter courseId={course.data.id} />
                </div>
              </Accordion.Item>
            )}
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
