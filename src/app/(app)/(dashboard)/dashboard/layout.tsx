"use client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Tag from "@/app/components/Tag/Tag";
import {
  IconBooks,
  IconChalkboard,
  IconDesk,
  IconLayoutDashboard,
  IconLayoutSidebarLeftExpand,
  IconMail,
  IconMessageReport,
  IconMicroscope,
  IconPresentation,
  IconReport,
  IconSettings,
  IconTags,
  IconTimeline,
  IconWorld,
} from "@tabler/icons-react";
import { authOptions } from "@/server/auth";
import { SideBar } from "@/app/components/SideBar";
import UserAvatar from "../../_components/UserAvatar";
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/Avatar/Avatar";
import { Modal } from "@/app/components/Modal";
import Button from "@/app/components/Button/Button";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@/hooks/useDisclosure";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [opened, { open, close }] = useDisclosure();
  const pathname = usePathname();
  return (
    <div className="relative flex pt-[78px]">
      <aside className="fixed top-[78px] z-30">
        <SideBar.Root className="">
          <SideBar.Section first>
            <SideBar.Item
              title="Inicio"
              icon={IconWorld}
              href="/"
              active={pathname === `/`}
            />
            <SideBar.Item
              title="Painel de controle"
              icon={IconLayoutDashboard}
              href="/dashboard"
              active={pathname === `/dashboard`}
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item
              title="Cursos"
              icon={IconBooks}
              href="/dashboard/courses"
              active={pathname === `/dashboard/courses`}
            />
            <SideBar.Item
              title="Categorias"
              href="/dashboard/categories"
              icon={IconTags}
              active={pathname === `/dashboard/categories`}
            />
          </SideBar.Section>

          <SideBar.Section>
            <SideBar.Item
              title="Definições"
              href="/dashboard/settings/account"
              icon={IconSettings}
              active={
                pathname === `/dashboard/settings` ||
                pathname === `/dashboard/settings/account` ||
                pathname === `/dashboard/settings/security` ||
                pathname === `/dashboard/settings/privacy` ||
                pathname === `/dashboard/settings/payments` ||
                pathname === `/dashboard/settings/notifications`
              }
            />
            <SideBar.Item
              title="Rendimento"
              href="/dashboard"
              icon={IconTimeline}
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item title="Quadro" icon={IconChalkboard} />
            {/***<SideBar.Item title="Materia" icon={IconMicroscope} />**/}
          </SideBar.Section>
          <SideBar.Section
            warning
            className="absolute bottom-[60px] w-full max-w-[180px]"
          >
            <div className="p-3 flex flex-col gap-2 rounded-lg bg-[#015f43]/80 text-zinc-50 dark:bg-[#363636] text-sm">
              <span className="line-clamp-1">Confirme o seu email</span>
              <p className="line-clamp-3">
                Enviamos um link de confirmação no teu email:
              </p>
              <span className="overflow-hidden overflow-ellipsis text-zinc-300 dark:text-zinc-400">
                {session?.user.email}
              </span>
            </div>
          </SideBar.Section>
          <SideBar.Section
            className={`absolute  bottom-0 w-full max-w-[180px]`}
          >
            <button onClick={() => open()}>
              <SideBar.Item
                title="Reportar erro"
                className=""
                icon={IconMessageReport}
              />
            </button>
          </SideBar.Section>
        </SideBar.Root>
      </aside>
      <main className="w-full">{children}</main>
      <Modal.Root isOpen={opened} onClose={() => close()}>
        <Modal.Content className="h-full p-0 justify-center items-center">
          <IconMessageReport className="size-8 text-red-600 absolute top-6 left-[200px]" />
          <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-3">
            <div className="flex flex-col gap-4 pt-4 relative">
              <h2 className="text-2xl font-semibold">O quê que aconteceu?</h2>
              <textarea
                name="Error"
                placeholder="Nos conte o que aconteceu..."
                className=" min-h-[158px]  p-2.5 justify-between w-full font-normal relative flex items-center gap-3 dark:bg-[#363636] border border-[#1f1f1f]/10 dark:border-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f]   rounded-md  motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100 box-border shadow-sm transition-all focus-visible:shadow-md focus:ring-[#363636] focus:ring-[1px] focus-visible:ring-background-control  group border-control"
              />
              <Button fullWidth size="lg">
                <span className="text-base">Reportar</span>
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}
