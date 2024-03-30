"use client";
import { HomeIcon, CardStackIcon, DashboardIcon, CubeIcon, GearIcon, ExitIcon, BackpackIcon, MixerHorizontalIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { SideBar } from "../components/SideBar"
import Link from "next/link";
import { Search } from "../components/Search/Index";
import { useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Dropdown } from "../components/Dropdown";
import { DropdownContext } from "../components/Dropdown/DropdownRoot";
import { IconBooks, IconChalkboard, IconDesk, IconLayoutDashboard, IconLogout, IconMicroscope, IconMoneybag, IconMoonStars, IconPresentation, IconSettings, IconSun, IconWorld } from "@tabler/icons-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // reference for the implementation of the function below 
  const ref = useRef(null);
 
/** 
 *TODO: When Zustand: 
        Create an event listener function to close the User Dropdown whenever you click outside of the component.  

  useEffect(() => {
    const handleOutSideClick = (event:any) => {
      if (!ref.current?.contains(event.target)) {
        setcloseDropdown(false)
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

*/


  return (
    <div className="relative flex" >
      <aside className="sticky mt-5 top-5 left-5 h-[100%] md:flex overscroll-y-none overscroll-x-none ">
      <SideBar.Root logo brand="Logotipo" className=""> 
        <SideBar.Section first>
          <SideBar.Item title="Explorar" icon={IconWorld} href="/"/>
          <SideBar.Item title="Cursos" icon={IconBooks} />
          <SideBar.Item title="Aulas" icon={IconPresentation}/>
        </SideBar.Section>
        <SideBar.Section title="Escritorio">
          <SideBar.Item title="Meus arquivos" icon={IconDesk} parent>
              <SideBar.Item title="Teste" href="/teste"/>
              <SideBar.Item title="Login" href="/auth/login"/>
              <SideBar.Item title="Register" href="/auth/register"/>
          </SideBar.Item>

          <SideBar.Item title="Quadro" icon={IconChalkboard}/>
          <SideBar.Item title="Materia" icon={IconMicroscope}/>
        </SideBar.Section>
      </SideBar.Root>
      </aside>
      <main className="w-full">
        <div className="flex px-9 pt-5 pb-4">
          <Search.Root className="w-[100%]">
            <Search.Section title="Colegas">
              <Search.Result type="user" user={{name: "Winslet Mateus", email: "winsletmateus@gmail.com"}}/>
              <Search.Result type="user" user={{name: "João Francisco", email: "jfrancisco@gmail.com"}}/>
            </Search.Section>
            <Search.Section title="Materia">
              <Search.Result type="file" name="Algebra_linear.pdf"/>
              <Search.Result type="file" name="Calculo-01.pdf"/>
              <Search.Result type="file" name="Introdução_EngInf.pdf"/>
            </Search.Section>
          </Search.Root>

          <div className="items-center my-auto ml-auto relative space-x-4 " >
            <Dropdown.Root>
              <Dropdown.Trigger>
                <span className="inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500 select-none cursor-pointer" >
                  WM
                </span>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Section>
                  <Dropdown.Item title={"Winslet Mateus"} description="hoblayrecords@gmail.com"/>
                  <Dropdown.Item title={"Painel de control"} startContent={ <IconLayoutDashboard className="w-4 h-4"/>}/>
                  <Dropdown.Item title={"Definições"} startContent={<IconSettings  className="w-4 h-4"/>}/>
                  <Dropdown.Item title={"Ganhos"} startContent={<IconMoneybag className="w-4 h-4"/>}/>
                  <Dropdown.Item title={`Modo escuro`} shortcut description="Trocar o tema" startContent={<IconMoonStars className="w-4 h-4"/>} onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")} />
                </Dropdown.Section>
                <Dropdown.Section showDivider>
                  
                  <Dropdown.Item title="Sair" description="Encerrar sessão" startContent={ <IconLogout  className="w-4 h-4"/>}/>
                </Dropdown.Section>
              </Dropdown.Menu> 
            </Dropdown.Root>
          </div>

        </div>
        {children}
      </main>
    </div>
  )}
