import { ArchiveIcon, BackpackIcon, CardStackIcon, ChevronDownIcon, Cross1Icon, MagnifyingGlassIcon, PaperPlaneIcon, PersonIcon, PlusIcon, ResetIcon, TextAlignTopIcon } from '@radix-ui/react-icons'
import React from 'react'

function Test() {
  // split the text like
const [firstPart, secondPart] = this.state.text.split("@");
const [higlighted , restText] = secondPart ? secondPart.split(' ') : [];
  return ( 
    <form className="max-w-lg shadow-sm">   
        <label for="default-search" className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
                </div>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-zinc-600 border-b-2 border-zinc-300  rounded-t-xl bg-zinc-50 outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Cursos, Docentes, Colegas..." required >
            <div className="absolute z-40 inset-y-0 end-4 flex items-center ps-3 pointer-events-none hover:text-zinc-600 hover:cursor-pointer hidden">
              <Cross1Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 "/>
            </div>
        </div>
      <div className="bg-zinc-50 w-full rounded-b-xl">
      <div className="p-4">
          <span className="text-zinc-500 text-sm">Estou a procura de...</span>
          <div className="py-1 space-x-1 flex">
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 space-x-2 text-center items-center hover:cursor-pointer">
              <CardStackIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
              <span className=" ">Cursos</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 space-x-2 text-center items-center hover:cursor-pointer">
              <ArchiveIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
              <span className=" ">Materia</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 space-x-2 text-center items-center hover:cursor-pointer">
              <PersonIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
              <span className=" ">Colegas</span>
            </div>
            <div className="flex p-2 rounded-xl text-sm text-zinc-800 bg-zinc-100 hover:bg-zinc-200 space-x-2 text-center items-center hover:cursor-pointer">
              <span className=" ">Mais</span>
              <ChevronDownIcon className="w-4 h-4 z-40 text-zinc-500 dark:text-zinc-400 "/> 
            </div>
          </div>
        </div>
        <div className="">
          <span className="text-zinc-500 text-sm p-4">Colegas</span>
          <div className="py-2 flex-col p-2 space-y-1">
            <div className="flex items-center space-x-2 relative p-2 rounded-xl hover:bg-zinc-100 hover:cursor-pointer">
              <span className="bg-slate-400 w-7 h-7 rounded-full dark:border-zinc-800"></span>
              <span className="text-sm text-zinc-700 ">Winslet Mateus</span>
              <span className="text-sm text-zinc-500 ">hoblayrecords@gmail.com</span>
              <PlusIcon className="w-4 h-4 right-3 absolute"/>
            </div>
            <div className="flex items-center space-x-2 relative p-2 rounded-xl hover:bg-zinc-100 hover:cursor-pointer">
              <span className="bg-green-300 w-7 h-7 rounded-full dark:border-zinc-800"></span>
              <span className="text-sm text-zinc-700 ">Winslet Mateus</span>
              <span className="text-sm text-zinc-500 ">hoblayrecords@gmail.com</span>
              <PlusIcon className="w-4 h-4 right-3 absolute"/>
            </div>
            <div className="flex items-center space-x-2 relative p-2 rounded-xl hover:bg-zinc-100 hover:cursor-pointer">
              <span className="bg-purple-300 w-7 h-7 rounded-full dark:border-zinc-800"></span>
              <span className="text-sm text-zinc-700 ">Winslet Mateus</span>
              <span className="text-sm text-zinc-500 ">hoblayrecords@gmail.com</span>
              <PlusIcon className="w-4 h-4 right-3 absolute"/>
            </div>
          </div>
        </div>
        <div className="">
          <span className="text-zinc-500 text-sm p-4">Materia</span>
          <div className="py-2 flex-col p-2 space-y-1">
            <div className="flex items-center space-x-2 relative px-4 py-3 rounded-xl hover:bg-zinc-100 hover:cursor-pointer">
              <ArchiveIcon className=" w-4 h-4"/>
              <span className="text-sm text-zinc-700 ">Algebra_linear.pdf</span>
              <ResetIcon className="w-4 h-4 right-3 absolute"/>
            </div>
            <div className="flex items-center space-x-2 relative px-4 py-3 rounded-xl hover:bg-zinc-100 hover:cursor-pointer">
              <ArchiveIcon className=" w-4 h-4"/>
              <span className="text-sm text-zinc-700 ">Algebra_linear.pdf</span>
              <ResetIcon className="w-4 h-4 right-3 absolute"/>
            </div>
            
          </div>
        </div>
      </div> 
    </form>

  )
}

export default Test