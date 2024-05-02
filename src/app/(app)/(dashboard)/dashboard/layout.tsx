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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
    <div className="relative flex pt-[78px]">
      <aside className="fixed top-[78px] z-30">
        <SideBar.Root className="">
          <SideBar.Section first>
            <SideBar.Item title="Inicio" icon={IconWorld} href="/" />
            <SideBar.Item
              title="Painel de controle"
              icon={IconLayoutDashboard}
              href="/dashboard"
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item
              title="Cursos"
              icon={IconBooks}
              href="/dashboard/courses"
            />
            <SideBar.Item
              title="Categorias"
              href="/dashboard/categories"
              icon={IconTags}
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item
              title="Definições"
              href="/dashboard/settings/account"
              icon={IconSettings}
            />
            <SideBar.Item
              title="Rendimento"
              href="/dashboard"
              icon={IconTimeline}
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item title="Quadro" icon={IconChalkboard} />
            <SideBar.Item title="Materia" icon={IconMicroscope} />
          </SideBar.Section>

          <SideBar.Section
            className={`absolute  bottom-0 w-full max-w-[180px]`}
          >
            <Modal.Root>
              <Modal.Trigger>
                <SideBar.Item
                  title="Reportar erro"
                  className=""
                  icon={IconMessageReport}
                />
              </Modal.Trigger>
              <Modal.Content className="h-full p-0 justify-center items-center">
                <IconMessageReport className="size-8 text-red-600 absolute top-6 left-[200px]" />
                <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-3">
                  <div className="flex flex-col gap-4 pt-4 relative">
                    <h2 className="text-2xl font-semibold">
                      O quê que aconteceu?
                    </h2>
                    <textarea
                      name="Error"
                      placeholder="Curso de fundamentos de
                    inteligencia artificial"
                      className=" min-h-[158px]  p-2.5 justify-between w-full font-normal relative flex items-center shadow-sm gap-3 dark:bg-[#363636] border border-[#1f1f1f]/10 dark:border-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f]   rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100"
                    />
                    <Button fullWidth size="lg">
                      <span className="text-base">Reportar</span>
                    </Button>
                  </div>
                </div>
              </Modal.Content>
            </Modal.Root>
          </SideBar.Section>
        </SideBar.Root>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
