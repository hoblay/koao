import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ClassContent from "@/app/components/ClassContent/ClassContent";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { Card } from "@/app/components/Card";

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
    <div className="relative flex gap-6 px-16 py-1.5">
      <main className="w-full min-w-[853px]">{children}</main>
      <aside className=" md:flex flex-col gap-4 overscroll-y-none overscroll-x-none max-w-[400px] max-h-[594px]">
        <ClassContent course={course} />
        <Card.Root className="p-4">
          <Card.Header></Card.Header>
          <Card.Body></Card.Body>
        </Card.Root>
      </aside>
    </div>
  );
}
