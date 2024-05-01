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
  IconMicroscope,
  IconPresentation,
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
    <div className="relative flex pt-[78px]">
      <aside className="fixed top-[78px] z-50">
        <SideBar.Root className="">
          <SideBar.Section first>
            <SideBar.Item title="Inicio" icon={IconWorld} href="/" />
            <SideBar.Item
              title="Painel de controle"
              icon={IconLayoutDashboard}
              href="/teacher"
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item title="Cursos" icon={IconBooks} href="/teacher" />
            <SideBar.Item
              title="Categorias"
              href="/teacher/category"
              icon={IconTags}
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item
              title="Definições"
              href="/teacher/settings"
              icon={IconSettings}
            />
            <SideBar.Item
              title="Rendimento"
              href="/teacher/settings"
              icon={IconTimeline}
            />
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item title="Quadro" icon={IconChalkboard} />
            <SideBar.Item title="Materia" icon={IconMicroscope} />
          </SideBar.Section>

          <SideBar.Section className={`absolute bottom-0 w-full max-w-[180px]`}>
            <SideBar.Item
              title="fechar"
              className=""
              icon={IconLayoutSidebarLeftExpand}
            />
          </SideBar.Section>
        </SideBar.Root>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
