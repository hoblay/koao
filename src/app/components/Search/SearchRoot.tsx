"use client";
import { MagnifyingGlassIcon, Cross1Icon, CardStackIcon, ArchiveIcon, PersonIcon, ChevronDownIcon, PlusIcon, ResetIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { IconBooks, IconChevronDown, IconNotebook, IconSearch, IconUsers } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { createContext, useContext } from 'react';
import Tag from "../Tag/Tag";

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

  const type = () => {
    setIsTyping(true);
  }


  

  return(
    
    <form className={`hidden sm:block relative max-w-lg rounded-xl ${className} ${isFocus ? 'shadow-sm ' : ''}`}  onFocus={() => handleFocus()} onBlur={() => handleBlur()} autoComplete="off"> 
        <label className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-white">Pesquisar</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IconSearch className="w-5 h-5 text-zinc-500 dark:text-zinc-400 "/>
                </div>
            </div>
            <input type="search" className={`peer block w-full p-4 ps-10 text-sm text-zinc-600 placeholder:text-zinc-500 bg-zinc-50 outline-none  dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white  transition-transform ease-in duration-150 ${isFocus ? '  rounded-t-xl': 'rounded-xl' }`} placeholder="Pesquisar cursos, docentes, colegas, materia..."
            onChange={e => type()}
            />
            <div className="absolute z-40 inset-y-0 end-4 items-center ps-3 pointer-events-none hover:text-zinc-600 hover:cursor-pointer hidden">
              <Cross1Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 "/>
            </div>
        </div>
      <div className={`absolute z-40 md:block hidden overflow-hidden  justify-center subpixel-antialiased outline-none box-border  shadow-md bg-zinc-50 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white w-full rounded-b-xl transition-[max-height] border-[#256a55]  dark:border-[#015F43] duration-150 ease-in-out ${!isFocus ? 'max-h-0' : ' max-h-max pb-1 border-t-2 '}`}>
      <div className="p-4 space-y-1">
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">Estou a procura de...</span>
          <div className="py-1 space-x-1 flex">
            <Tag name="Cursos"/>
            <Tag name="Materia"/>
            <Tag name="Colegas"/>
            <Tag name="Mais"/>
            
          </div>
        </div>
        <SearchContext.Provider value={{ isTyping, }}>
          {children}
        </SearchContext.Provider>
      </div> 
    </form>
  );
}