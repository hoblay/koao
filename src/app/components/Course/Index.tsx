
import { CardStackIcon, HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react'

interface CourseProps{
  className?: string,
  progress?: number,
  img: string,
  name: string,
  price: number | 0,
  modules: number,



}

function Course({ className, progress, img, name, price, modules }:CourseProps) {
  const pp = `w-[${progress}%]`;
  return ( 
    <Link href="/course" className=''>
      <div className="relative flex w-full md:max-w-[100%] max-w-max flex-col rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:dark:bg-zinc-900/60 bg-clip-border text-zinc-700 dark:text-zinc-100 shadow-sm hover:shadow hover:cursor-pointer">
        <div
          className="relative mx-4 mt-4 overflow-hidden text-white rounded-lg bg-purple-zinc-500 bg-clip-border shadow-purlple-zinc-500/40">
          <img
            src={img}/>
          <div
            className=" absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-zinc-900/60">
          </div>
          <button
            className="hidden !absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-purple-500 transition-all hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <HeartFilledIcon className="w-6 h-6"/>
            </span>
          </button>
        </div>
        <div className="px-4 py-4 flex-col  space-y-3">
          <div className="flex items-center justify-between mb-3 gap-1">
            <h5 className="block font-sans antialiased font-medium leading-snug tracking-normal text-blue-zinc-900 line-clamp-2">
              {name}
            </h5>
            <p
              className="flex whitespace-nowrap font-semibold items-center text-sm leading-relaxed text-zinc-600 antialiased">
              
              {price ? `${price} AKZ` : 'Gratis'}
            </p>
          </div>
          <div className="flex ">
            <div
              className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 py-1.5 px-3 font-sans text-xs text-zinc-900 dark:text-zinc-100 ">
              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                <CardStackIcon  className="w-5 h-5 dark:text-zinc-400"/>
              </div>
              <span className="ml-[18px]">{modules} Modulos</span>
            </div>
          </div>
            
          <div className={`w-full bg-zinc-200 rounded dark:bg-zinc-700 ${!progress && 'hidden'} mt-2`} >
            <div className={`bg-purple-300 dark:bg-purple-700 text-xs font-medium text-purple-950 dark:text-zinc-100 text-center p-0.5 leading-none rounded whitespace-nowrap`} style={{width: `${progress}%` }} > {progress}% 
            Completado</div>
          </div>

        </div>
      </div> 
    </Link>

  )
}

export default Course;