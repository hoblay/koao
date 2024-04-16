import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ClassContent from "@/app/components/ClassContent/ClassContent";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

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
    <div className="relative flex">
      <aside className="sticky mt-3 top-5 left-5 h-[100%] md:flex overscroll-y-none overscroll-x-none max-w-[350px]">
        <ClassContent course={course} />
      </aside>
      <main className="w-full min-w-[1098px]">{children}</main>
    </div>
  );
}
