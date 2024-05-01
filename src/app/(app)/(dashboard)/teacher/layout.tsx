import { getServerSession } from "next-auth";
import Link from "next/link";
import Tag from "@/app/components/Tag/Tag";
import {
  IconLayoutDashboard,
  IconSettings,
  IconTags,
  IconTimeline,
} from "@tabler/icons-react";
import { authOptions } from "@/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex py-[88px]">
      <main className="w-full flex flex-col">
        <div className=" flex flex-col">
          <nav className="md:px-24 px-4 pb-4 w-full">
            <div className="flex gap-3">
              <Link href="/teacher">
                <Tag
                  name="Painel de controle"
                  startContent={
                    <IconLayoutDashboard className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  }
                />
              </Link>
              <Link href="/teacher/category">
                <Tag
                  name="Categorias"
                  startContent={
                    <IconTags className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  }
                />
              </Link>
              <Link href="/settings">
                <Tag
                  name="Definições"
                  startContent={
                    <IconSettings className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  }
                />
              </Link>
              <Link href="/teacher/create">
                <Tag
                  name="Rendimento"
                  startContent={
                    <IconTimeline className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  }
                />
              </Link>
            </div>
          </nav>
          <main className="w-full  ">{children}</main>
        </div>
      </main>
    </div>
  );
}
