
import { CardStackIcon, HeartFilledIcon, HeartIcon, LaptopIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react'
import { Card } from './Card';

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
      <Card.Root>
      <Card.Body className='relative'>
        <img src={img} className="object-cover rounded-xl w-full md:max-h-[172px]"/>
        <div
          className="hidden absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-zinc-900/60">
        </div>
        <button
            className="hidden !absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-purple-500 transition-all hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <HeartFilledIcon className="w-6 h-6"/>
            </span>
          </button>
      </Card.Body>
      <Card.Footer className="p-3 h-auto flex w-full items-center color-inherit subpixel-antialiased gap-3">
        <div className="flex flex-col gap-3">
          <div className=" flex items-center overflow-hidden subpixel-antialiased justify-between">
            <div className="text-left">
              <b className=" line-clamp-2 font-medium">{name}</b>
            </div>
            <p className="text-zinc-500 text-sm">{price ? `${price} AKZ` : 'Gratis'}</p>
          </div>
          <div className="flex gap-1">
            <div
              className="relative flex select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 py-1.5 px-3 font-sans text-xs text-zinc-900 dark:text-zinc-100 ">
              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                <CardStackIcon  className="w-5 h-5 dark:text-zinc-400"/>
              </div>
              <span className="ml-[18px]">{modules} Modulos</span>
            </div>
            <div
              className="relative flex select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 py-1.5 px-3 font-sans text-xs text-zinc-900 dark:text-zinc-100 ">
              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                <LaptopIcon  className="w-5 h-5 dark:text-zinc-400"/>
              </div> 
              <span className="ml-[18px]">Programação</span>
            </div>
            
          </div>
        </div>

      </Card.Footer> 
        
      </Card.Root>
    </Link>
    

  )
}

export default Course;