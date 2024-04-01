"use client";
import { GearIcon, ExitIcon, BackpackIcon, MixerHorizontalIcon, ArrowLeftIcon, MoonIcon, SunIcon, } from "@radix-ui/react-icons"
import Link from "next/link";
import { Search } from "../components/Search/Index";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ClassContent from "../components/ClassContent/ClassContent";
import { Dropdown } from "../components/Dropdown";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import UserAvatar from "../components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

          <div className="flex items-center my-auto ml-auto relative space-x-4 ">
          <div className="">
            <Link href={'/'} className="py-3 px-4 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-900/50 flex space-x-2 text-center items-center">
              <ArrowLeftIcon />
              <span>Voltar pro inicio</span>
            </Link>
          </div>
          <UserAvatar theme={theme} setTheme={setTheme}/>
          </div>

        </div>
        {children}
      </main>
    </div>
  )}