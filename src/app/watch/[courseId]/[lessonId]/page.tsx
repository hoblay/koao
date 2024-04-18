"use client";
import { trpc } from "@/app/_trpc/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { Card } from "@/app/components/Card";
import ReactPlayer from "react-player";
export default function ClassPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lesson = trpc.lesson.getById.useQuery(params.lessonId);
  if (!lesson.data) {
    return null;
  }

  return (
    <div className="">
      <div className="flex relative rounded-2xl bg-zinc-950 min-w-[853px] min-h-[480px] overflow-hidden ">
        <ReactPlayer
          controls
          width={"100%"}
          className="absolute top-0 left-0"
          height={"100%"}
          url={lesson.data.video?.commitUrl ? lesson.data.video?.commitUrl : ""}
          config={{}}
        />
      </div>

      <div className=" max-w-[853px]">
        <div className="flex flex-col gap-2 px-2 py-4">
          <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
            {lesson.data.title}
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Avatar
                name={lesson.data.chapter.course.author.name}
                color="green"
                image={lesson.data.chapter.course.author.image}
              />
              <div className="flex flex-col align-center justify-center">
                <span className="text-zinc-800 dark:text-zinc-100 text-sm">
                  {lesson.data.chapter.course.author.name}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Front End Developer
                </span>
              </div>
            </div>
            <div className="flex">
              <button
                type="button"
                className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43] hover:bg-[#143229] text-white px-4 py-2 text-sm"
              >
                <div className="flex flex-1 justify-center items-center gap-2">
                  <span className="text-base leading-6">Proxima aula</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <Card.Root className="">
          <Card.Body className="p-4">
            <div className="flex flex-col gap-6 leading-[1.6]">
              <p>
                {lesson.data.description}
                Introdução ao Photoshop O Photoshop é um software de edição de
                imagens digitalmente avançado e versátil, utilizado por
                profissionais da área de design gráfico, ilustração, design de
                produto, fotografia, influencers digitais e muitos outros.
                Entendendo a interface A interface do Photoshop é intuitiva e
                organizada, com uma barra de ferramentas principal e uma área de
                trabalho principal para visualizar e editar imagens.
                Configurando o ambiente de trabalho Configurar o ambiente de
                trabalho do Photoshop é importante para maximizar a
                produtividade e eficiência ao editar imagens.
              </p>
            </div>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  );
}
