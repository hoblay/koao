import { IconDots, IconChevronRight } from '@tabler/icons-react'
import React from 'react'

function Test({courseId, chapterId}:{ courseId: string, chapterId: string}) {
  return (
   
<ol className="flex flex-wrap justify-center items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">

  <li className="inline-flex items-center gap-1.5">
    <span className="font-normal text-foreground max-w-52 truncate overflow-ellipsis">{courseId}</span>
  <IconChevronRight  className='w-4 h-4 mt-[3px]'/>
  </li>
  <li className="inline-flex items-center gap-1.5">
    <span className="font-normal text-foreground">{chapterId}</span>
    <IconChevronRight  className='w-4 h-4 mt-[3px]'/>
  </li>
  <li className="inline-flex items-center gap-1.5">
    <span className="font-normal text-foreground">Solucoes</span>
  </li>

    
</ol>
  )
}

export default Test




/**
 * 
 * 
 * 
 * <li
    role="presentation"
    aria-hidden="true"
    className="[&>svg]:size-3.5"
  >
<span className="font-normal text-foreground">Solucoes</span>
  <span className="flex h-9 w-9 items-center justify-center">
    <IconDots className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>

    <IconChevronRight />
  </li>
 * 
 * 
 * 
 * 
 */