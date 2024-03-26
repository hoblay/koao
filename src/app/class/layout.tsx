"use client";
import { HomeIcon, PlayIcon, GearIcon, ExitIcon, BackpackIcon, MixerHorizontalIcon, ArrowLeftIcon, ChevronDownIcon, PauseIcon } from "@radix-ui/react-icons"
import { SideBar } from "../components/SideBar"
import Link from "next/link";
import { Search } from "../components/Search/Index";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Content } from "../components/Content/index";
import Prova from "../components/Content/Prova";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDropdownOpen, setisDropdownOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleDropdown = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setisDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutSideClick = (event:any) => {
      if (!ref.current?.contains(event.target)) {
        closeDropdown()
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div className="relative flex">
      <aside className="sticky mt-5 top-5 left-5 h-[100%] md:flex overscroll-y-none overscroll-x-none max-w-[350px]">
       <Prova/>
        
       
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
          <div className="flex  my-auto ml-auto items-center space-x-4">
          <div className="">
            <Link href={'/'} className="py-3 px-4 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-900/50 flex space-x-2 text-center items-center">
              <ArrowLeftIcon />
              <span>Voltar pro inicio</span>
            </Link>
          </div>
          <div className="items-center  relative space-x-4 " ref={ref}>
            <span className="inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500 select-none cursor-pointer" onClick={handleDropdown}
            
            >
              WM
            </span>
            <div className={`absolute mt-2 -right-1 z-10 bg-white divide-y divide-zinc-100 rounded-lg w-44 dark:bg-zinc-900 dark:divide-zinc-700 shadow  ${!isDropdownOpen ? 'hidden' : ''}`} >
              <div className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-100 ">
                <div className="">Winslet Mateus</div>
                <div className=" text-zinc-600 dark:text-zinc-400 truncate lowercase">winsletmateus@hoblay.com</div>
              </div>
              <ul className="py-2 text-sm text-zinc-700 dark:text-zinc-200">
                <li>
                  <Link href="#" className="flex space-x-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100">
                    <MixerHorizontalIcon className="my-auto"/> 
                    <span>Painel de controle</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex space-x-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100">
                    <GearIcon className="my-auto"/> 
                    <span>Definições</span>
                </Link>
                </li>
                <li>
                  <Link href="#" className="flex space-x-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100">
                    <BackpackIcon className="my-auto"/> 
                    <span>Ganhos</span>
                  </Link>
                </li>
              </ul>
              <div className="flex px-2 py-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <label className="inline-flex items-center w-full cursor-pointer">
                  <input type="checkbox" value="" checked={theme == "dark"} className="sr-only peer" onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}/>
                  <div className="relative w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-zinc-100 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-500 peer-checked:bg-purple-600"></div>
                  <span className="ms-3 text-sm text-zinc-700 dark:text-zinc-100">Modo escuro</span>
                </label>
              </div>
              <div className="py-2">
                <Link href="#" className="flex space-x-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100">
                  <ExitIcon className="my-auto"/> 
                  <span>Encerrar sessão</span>
                </Link>
              </div>
          </div>
          </div>
          </div>

        </div>
        {children}
      </main>
    </div>
  )}