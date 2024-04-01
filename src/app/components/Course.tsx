"use client";

import Link from 'next/link';
import React from 'react'
import { Card } from './Card';
import { IconDeviceSpeaker, IconNotebook, IconStarFilled } from '@tabler/icons-react';
import Tag from './Tag/Tag';
import Image from 'next/image';

interface CourseProps{
  className?: string,
  progress?: number,
  img: string,
  name: string,
  price: number | 0,
  modules: number,
  category: string



}

function Course({ className, progress, img, name, price, modules, category }:CourseProps) {
  const pp = `w-[${progress}%]`;
  return ( 
    <Link href="/course" className=''>
      <Card.Root>
      <Card.Body className='relative'>
        <Image src={img} className="object-cover rounded-xl w-full md:max-h-[172px] h-[100%]" alt='course' width={311} height={172} unoptimized/>
        
        <div
          className="hidden absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-zinc-900/60">
        </div>
           
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
            
            <Tag name={`${modules} Modulos`} startContent={<IconNotebook  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
            <Tag name={category}/>
            
          </div>
        </div>

      </Card.Footer> 
        
      </Card.Root>
    </Link>
    

  )
}

export default Course;