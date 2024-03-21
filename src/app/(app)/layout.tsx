"use client";
import { HomeIcon, CardStackIcon, DashboardIcon, CubeIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons"
import { SideBar } from "../components/SideBar"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex">
      <aside className="sticky top-0 h-[100%] md:flex hidden ">
      <SideBar.Root logo brand="Logotipo"> 
        <SideBar.Section first>
          <SideBar.Item title="Inicio" icon={HomeIcon}/>
          <SideBar.Item title="Cursos" icon={CardStackIcon} />
          <SideBar.Item title="Area do aluno" icon={DashboardIcon} parent>
            <SideBar.Item title="Meus cursos"/>
            <SideBar.Item title="Aulas"/>
            <SideBar.Item title="Comunidade"/>
          </SideBar.Item>
        </SideBar.Section>
        <SideBar.Section title="Definições">
          <SideBar.Item title="Element" icon={CubeIcon}/>
          <SideBar.Item title="Definições" icon={GearIcon} parent>
            <SideBar.Item title="Privacidade"/>
            <SideBar.Item title="Segurança"/>
          </SideBar.Item>
          <SideBar.Item title="Sair" icon={ExitIcon}/>
        </SideBar.Section>
      </SideBar.Root>
      </aside>
      <main className="w-full">
        {children}
      </main>
    </div>
  )}