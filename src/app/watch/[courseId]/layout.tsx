import ClassContent from "@/app/components/ClassContent/ClassContent";
import { serverClient } from "@/app/_trpc/serverClient";
import { Card } from "@/app/components/Card";
import { IconNotebook } from "@tabler/icons-react";

export default async function ClassLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const course = await serverClient.course.getById(params.courseId);
  if (!course) {
    return null;
  }

  return (
    <div className="relative flex gap-6 px-16 py-1.5 pb-8">
      <main className="w-full min-w-[853px]">{children}</main>
      <aside className=" md:flex flex-col gap-4 overscroll-y-none overscroll-x-none max-w-[400px] max-h-[594px]">
        <ClassContent course={course} />
        <Card.Root className="">
          <Card.Header>
            <div className="py-4 px-6 flex gap-4 items-center">
              <div className="p-3 rounded-xl bg-zinc-800">
                <IconNotebook />
              </div>
              <h3 className="text-xl">Material da aula</h3>
            </div>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card.Root>
      </aside>
    </div>
  );
}
