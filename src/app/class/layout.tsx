"use client";
import { GearIcon, ExitIcon, BackpackIcon, MixerHorizontalIcon, ArrowLeftIcon, MoonIcon, SunIcon, } from "@radix-ui/react-icons"
import Link from "next/link";
import { Search } from "../components/Search/Index";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ClassContent from "../components/ClassContent/ClassContent";
import { Dropdown } from "../components/Dropdown";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;



  return (
    <div className="relative flex">
      <aside className="sticky mt-5 top-5 left-5 h-[100%] md:flex overscroll-y-none overscroll-x-none max-w-[350px]">
       <ClassContent/>
        
       
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

          <div className="flex items-center my-auto ml-auto relative space-x-4 " ref={ref}>
          <div className="">
            <Link href={'/'} className="py-3 px-4 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-900/50 flex space-x-2 text-center items-center">
              <ArrowLeftIcon />
              <span>Voltar pro inicio</span>
            </Link>
          </div>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <span className="inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500 select-none cursor-pointer" >
                  WM
                </span>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Section>
                  <Dropdown.Item title={"Winslet Mateus"} description="hoblayrecords@gmail.com"/>
                  <Dropdown.Item title={"Painel de control"} startContent={ <MixerHorizontalIcon/>}/>
                  <Dropdown.Item title={"Definições"} startContent={<GearIcon/>}/>
                  <Dropdown.Item title={"Ganhos"} startContent={<BackpackIcon/>}/>
                  <Dropdown.Item title={`${theme === "dark" ? "Modo escuro" : "Modo claro"}`} shortcut description="Trocar o tema" startContent={theme === "dark" ? <IconMoonStars className="w-4 h-4"/> : <IconSun className="w-4 h-4"/>} onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}/>
                </Dropdown.Section>
                <Dropdown.Section showDivider>
                  
                  <Dropdown.Item title="Sair" description="Encerrar sessão" startContent={ <ExitIcon/>}/>
                </Dropdown.Section>
              </Dropdown.Menu> 
            </Dropdown.Root>
          </div>

        </div>
        {children}
      </main>
    </div>
  )}