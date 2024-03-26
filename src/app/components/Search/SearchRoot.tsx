"use client";
import { MagnifyingGlassIcon, Cross1Icon, CardStackIcon, ArchiveIcon, PersonIcon, ChevronDownIcon, PlusIcon, ResetIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ReactNode, useState } from "react";
import { createContext, useContext } from 'react';

interface SearchProps{
  children: ReactNode,
  className?: string,
}


export const SearchContext = createContext({});


export function SearchRoot({ children, className }:SearchProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);


  const handleFocus = () => {

    setIsFocus(true);
  };


  const handleBlur = () => {

    setIsFocus(false);
    setIsTyping(false);
  };

  const type = (e) => {
    setIsTyping(true);
  }


  

  return(
    
    <form className={`relative max-w-lg rounded-xl ${className} ${isFocus ? 'shadow-sm ' : ''}`}  onFocus={() => handleFocus()} onBlur={() => handleBlur()} autoComplete="off"> 
        <label className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-white">Pesquisar</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 "/>
                </div>
            </div>
            <input type="search" className={`peer block w-full p-4 ps-10 text-sm text-zinc-600 placeholder:text-zinc-500 bg-zinc-50 outline-none  dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white  transition-transform ease-in duration-150 ${isFocus ? '  rounded-t-xl': 'rounded-xl' }`} placeholder="Pesquisar cursos, docentes, colegas, materia..."
            onChange={e => type(e)}
            />
            <div className="absolute z-40 inset-y-0 end-4 flex items-center ps-3 pointer-events-none hover:text-zinc-600 hover:cursor-pointer hidden">
              <Cross1Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 "/>
            </div>
        </div>
      <div className={`absolute z-40 md:block hidden overflow-hidden shadow bg-zinc-50 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white w-full rounded-b-xl transition-[max-height] border-purple-400  dark:border-purple-500 duration-150 ease-in-out ${!isFocus ? 'max-h-0' : ' max-h-max pb-1 border-t-2 '}`}>
      <div className="p-4 space-y-1">
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">Estou a procura de...</span>
          <div className="py-1 space-x-1 flex">
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-950 space-x-2 text-center items-center hover:cursor-pointer">
              <CardStackIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
              <span className=" ">Cursos</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-950 space-x-2 text-center items-center hover:cursor-pointer">
              <Pencil2Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
              <span className=" ">Materia</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-950 space-x-2 text-center items-center hover:cursor-pointer">
              <PersonIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
              <span className=" ">Colegas</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-950 space-x-2 text-center items-center hover:cursor-pointer">
              <span className=" ">Mais</span>
              <ChevronDownIcon className="w-4 h-4 z-40 text-zinc-500 dark:text-zinc-400 "/> 
            </div>
          </div>
        </div>
        <SearchContext.Provider value={{ isTyping, }}>
          {children}
        </SearchContext.Provider>
      </div> 
    </form>
  );
}