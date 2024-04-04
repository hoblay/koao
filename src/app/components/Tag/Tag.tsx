import { IconDeviceSpeaker, IconChefHat, IconPalette, IconCode, IconBrush, IconBooks, IconNotebook, IconUsers, IconChevronDown } from '@tabler/icons-react'
import React, { ReactNode } from 'react'

interface TagProps{
  name?: string,
  startContent?: ReactNode,
  className?: string
}

function Tag({name, startContent, className}:TagProps) {
  return (
    <div className={`relative flex gap-1.5 select-none items-center whitespace-nowrap rounded-lg bg-zinc-400/10 dark:bg-zinc-100/10 hover:bg-zinc-500/10 hover:dark:bg-zinc-400/10 py-1.5 px-2 text-xs text-zinc-900 dark:text-zinc-100 cursor-pointer ${className}`}>
      {startContent && (
        <div className="h-5 w-5">
          {startContent}
        </div>
      )}
      {name === 'Produção musical' && (
         <div className="">
            <IconDeviceSpeaker  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Culinaria' && (
         <div className="">
            <IconChefHat  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Design' && (
         <div className="">
            <IconPalette  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Programação' && (
         <div className="">
            <IconCode  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Arte' && (
         <div className="">
            <IconBrush  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Materia' && (
         <div className="">
            <IconNotebook  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Colegas' && (
         <div className="">
            <IconUsers  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
      {name === 'Cursos' && (
         <div className="">
            <IconBooks  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}

      <span className="">{name}</span>
      {name === 'Mais' && (
         <div className="">
            <IconChevronDown  className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
        </div> 
      )}
    </div>
  )
}

export default Tag