"use client";
import { ArrowLeftIcon, ChevronDownIcon, ChevronLeftIcon, HamburgerMenuIcon, PauseIcon, WidthIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { createContext, useContext } from 'react';

interface ContentProps{
  children?: ReactNode,
  className?: string,
  logo?: Boolean | false,
  brand?: string,
}



export const ContentContext = createContext({});

export function Teste({ children, className, logo, brand }:ContentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleHover = () => {
    setOpen(true);

    setIsHidden(!isHidden);
  };
  
  const handleLeave = () => {
    setOpen(false);
  };

  const hideButton = () => {
    setIsHidden(true);
  }

  const shrinkBar = () => {
    setOpen(!open);
  }
  

  return(
    
    <div className="h-[calc(100vh-40px)] overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto overflow-hidden bg-zinc-50 dark:bg-zinc-900 no-scrollbar">
        <div className="sticky top-0 bg-zinc-900 z-50 p-5">
          <h2 className="text-lg">Prisma & Free Databases (MySQL, Postgres & Mongo)</h2>
          <div className={`w-full bg-zinc-200 rounded dark:bg-zinc-700 my-2`} >
            <div className={`bg-purple-300 dark:bg-purple-700 text-xs font-medium text-purple-950 dark:text-zinc-100 text-center p-0.5 leading-none rounded whitespace-nowrap`} style={{width: `12%` }} > 12% 
            Completado</div>
          </div>
        </div>
        <div className=" w-full space-y-2 overscroll-y-auto bg-zinc-950/25 px-3 pt-1 pb-4">
          <div className="">
            <Link href={'#'} className="flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group space-x-4 group">
            <span className="rounded-full p-[9px] items-center text-center border-2 border-purple-700 bg-zinc-800 group-hover:bg-zinc-900">
              <PauseIcon />
            </span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <ChevronDownIcon className={`ml-2 w-5 h-5  transition-all transform duration-300 `}/>
            </Link>
            <div className="px-[33px] pt-3 ">
              <ol className="relative border-s border-zinc-200 dark:border-zinc-700">                  
                <li className="mb-4 ms-6 p-1  cursor-pointer ">            
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              1
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Introdução a computação</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              2
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-purple-900 hover:ring-8 dark:hover:ring-purple-900/30 dark:bg-zinc-800 ">
                          <span className=" text-purple-800 dark:text-purple-100 text-xs" >
                              3
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-2 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800 ">
                          <span className=" text-zinc-800 dark:text-zinc-300 text-xs" >
                              4
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  
                  
              </ol>
            </div>
          </div>
          <div className=" border-t-2 border-t-zinc-800">
            <Link href={'#'} className="flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group space-x-4 group">
            <span className="rounded-full px-3 py-1 items-center text-center border-2 border-zinc-700 bg-zinc-800 group-hover:bg-zinc-800">
              <span className="">2</span>
            </span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <ChevronDownIcon className={`ml-2 w-5 h-5  transition-all transform duration-300 `}/>
            </Link>
            <div className="px-8 pt-3 hidden ">
              <ol className="relative border-s border-zinc-200 dark:border-zinc-700">                  
                <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              1
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Introdução a computação</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              2
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              3
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-2 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              4
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  
                  
              </ol>
            </div>
          </div>
          <div className=" border-t-2 border-t-zinc-800">
            <Link href={'#'} className="flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group space-x-4 group">
            <span className="rounded-full px-3 py-1 items-center text-center border-2 border-zinc-700 bg-zinc-800 group-hover:bg-zinc-800">
              <span className="">3</span>
            </span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <ChevronDownIcon className={`ml-2 w-5 h-5  transition-all transform duration-300 `}/>
            </Link>
            <div className="px-8 pt-3 hidden ">
              <ol className="relative border-s border-zinc-200 dark:border-zinc-700">                  
                <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              1
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Introdução a computação</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              2
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              3
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-2 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              4
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  
                  
              </ol>
            </div>
          </div>
          <div className=" border-t-2 border-t-zinc-800">
            <Link href={'#'} className="flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group space-x-4 group">
            <span className="rounded-full px-3 py-1 items-center text-center border-2 border-zinc-700 bg-zinc-800 group-hover:bg-zinc-800">
              <span className="">4</span>
            </span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <ChevronDownIcon className={`ml-2 w-5 h-5  transition-all transform duration-300 `}/>
            </Link>
            <div className="px-8 pt-3 hidden ">
              <ol className="relative border-s border-zinc-200 dark:border-zinc-700">                  
                <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              1
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Introdução a computação</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              2
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              3
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-2 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              4
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  
                  
              </ol>
            </div>
          </div>
          <div className=" border-t-2 border-t-zinc-800">
            <Link href={'#'} className="flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group space-x-4 group">
            <span className="rounded-full px-3 py-1 items-center text-center border-2 border-zinc-700 bg-zinc-800 group-hover:bg-zinc-800">
              <span className="">5</span>
            </span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <ChevronDownIcon className={`ml-2 w-5 h-5  transition-all transform duration-300 `}/>
            </Link>
            <div className="px-8 pt-3 hidden ">
              <ol className="relative border-s border-zinc-200 dark:border-zinc-700">                  
                <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              1
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Introdução a computação</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              2
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              3
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-2 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              4
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  
                  
              </ol>
            </div>
          </div>
          <div className=" border-t-2 border-t-zinc-800">
            <Link href={'#'} className="flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group space-x-4 group">
            <span className="rounded-full px-3 py-1 items-center text-center border-2 border-zinc-700 bg-zinc-800 group-hover:bg-zinc-800">
              <span className="">6</span>
            </span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <ChevronDownIcon className={`ml-2 w-5 h-5  transition-all transform duration-300 `}/>
            </Link>
            <div className="px-8 pt-3 hidden ">
              <ol className="relative border-s border-zinc-200 dark:border-zinc-700">                  
                <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              1
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Introdução a computação</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              2
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-1 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              3
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  <li className="mb-4 ms-6 p-1  cursor-pointer">            
                      <span className="absolute flex mt-2 items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 ">
                          <span className=" text-purple-800 dark:text-purple-300 text-xs" >
                              4
                          </span>
                      </span>
                      <h3 className="flex text-sm items-center text-zinc-900 dark:text-white dark:hover:text-zinc-300">Lorem ipsum dolor sit amet consectetur.</h3>
                      
                  </li>
                  
                  
              </ol>
            </div>
          </div>
         
        </div>


      </div>
      
  );
}