import UserAvatar from "@/app/components/UserAvatar";
import { getServerSession } from "next-auth";
import LogoIcon from "@/app/components/Icons/Logo";
import Link from "next/link";
import Tag from "@/app/components/Tag/Tag";
import {
  IconLayoutDashboard,
  IconSettings,
  IconTags,
  IconTimeline,
} from "@tabler/icons-react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <div className="relative flex">
      <main className="w-full flex flex-col mt-24">
        <nav className=" dark:bg-[#101012] fixed w-full z-20 top-0 start-0 bg-white">
          <div className="relative flex md:px-[90px] px-6 pt-4 py-4  items-center justify-between">
            <div className="flex">
              <Link href={"/"} className="flex p-2 space-x-2 items-center">
                <div className="">
                  <LogoIcon width="40" height="28" className="#015F43" />{" "}
                </div>
                <span
                  className={`p-1 text-lg font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap transition-[opacity] duration-75 ease-in `}
                >
                  Logotipo
                </span>
              </Link>
            </div>
            <UserAvatar user={session?.user} />
          </div>
        </nav>
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
              <Link href="/teacher/upload">
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
