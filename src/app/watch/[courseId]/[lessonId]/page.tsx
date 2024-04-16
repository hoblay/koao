"use client";
import { trpc } from "@/app/_trpc/client";
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
    <div className="px-9">
      <div className="flex relative min-w-[1022px] min-h-[601px] overflow-hidden ">
        <ReactPlayer
          controls
          width={"100%"}
          className="absolute top-0 left-0"
          height={"100%"}
          url={lesson.data.video?.commitUrl ? lesson.data.video?.commitUrl : ""}
          config={{}}
        />
      </div>

      <div className="py-4 max-w-[1022px]">
        <Card.Root className="">
          <Card.Header showDivider className="flex px-8 py-5">
            <h4 className="text-zinc-600 dark:text-zinc-100 text-xl font-semibold w-full">
              {lesson.data.title}
            </h4>
            <div className="flex items-center gap-3"></div>
          </Card.Header>
          <Card.Body className="py-5 px-8">
            <div className="flex flex-col gap-6 leading-[1.6]">
              <p>{lesson.data.description}</p>
            </div>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  );
}
