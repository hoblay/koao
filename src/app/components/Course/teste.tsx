
import { CardStackIcon, HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import React from 'react'

function Teste() {
  return ( 
    <div className=''>
      <div className="relative flex w-full md:max-w-[20rem] max-w-max flex-col rounded-lg bg-zinc-50 dark:bg-zinc-900 bg-clip-border text-zinc-700 dark:text-zinc-100 shadow-sm hover:shadow hover:cursor-pointer">
        <div
          className="relative mx-4 mt-4 overflow-hidden text-white rounded-lg bg-purple-zinc-500 bg-clip-border shadow-purlple-zinc-500/40">
          <img
            src="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fd2ebdb09-0a4d-4edf-9681-b0a864f01687-8nhtey.png&w=3840&q=75"
            alt="ui/ux review check" />
          <div
            className="hidden absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-purple-900/60">
          </div>
          <button
            className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-purple-500 transition-all hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <HeartFilledIcon className="w-6 h-6"/>
            </span>
          </button>
        </div>
        <div className="px-4 py-4 flex-col  space-y-3">
          <div className="flex items-center justify-between mb-3 gap-1">
            <h5 className="block font-sans antialiased font-medium leading-snug tracking-normal text-blue-zinc-900">
              Building a full stack Notion clone.
            </h5>
            <p
              className="flex whitespace-nowrap items-center text-sm leading-relaxed text-zinc-600 antialiased">
              
              Gratis
            </p>
          </div>
          <div className="flex ">
            <div
              className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 py-1.5 px-3 font-sans text-xs text-zinc-900 dark:text-zinc-100 ">
              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                <CardStackIcon  className="w-5 h-5"/>
              </div>
              <span className="ml-[18px]">25 Modulos</span>
            </div>
          </div>
            
          <div className=" w-full bg-zinc-200 rounded-md dark:bg-zinc-700">
            <div className="bg-purple-600 dark:bg-purple-700 text-xs font-medium text-zinc-50 dark:text-zinc-100 text-center p-0.5 leading-none rounded-md w-[45%]" > 45%</div>
          </div>

        </div>
      </div> 
    </div>

  )
}

export default Teste;