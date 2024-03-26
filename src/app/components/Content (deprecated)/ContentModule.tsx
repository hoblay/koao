"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useContext } from 'react';
import { ContentContext } from "./ContentRoot";
import { PauseIcon, ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { ContentLesson } from "./ContentLesson";

interface ContentModuleProps{
  children?: ReactNode,
  className?: string,
  name?: string,
  active?: boolean,
  done?: boolean,
  open: boolean,
  index: number,
  onClick: () => void,
  onActive: () => void,
  lessons: Array<LessonProps>
  lessonsDone: any
  addLesson: void
}

export interface LessonProps{
  name: string,
  active: boolean,
  done: boolean,
}




const moduleContainer = tv({
  base: 'relative flex mt-2 items-center py-2 px-4 text-zinc-600 rounded-lg dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-900 group space-x-4 group cursor-pointer',
  variants: {
    open: {
      true: 'bg-zinc-200/50 dark:bg-zinc-900 dark:text-zinc-200',
      
    },
    active: {
      true: 'dark:text-zinc-200'
    }
  },
  defaultVariants: {
    open: false,
  }
});

const moduleCircle = tv({
  base: 'flex rounded-full px-3 py-1 text-[16px] items-center justify-center text-center border-2 dark:group-hover:bg-zinc-900 bg-zinc-50 border-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 min-w-[37px] min-h-[37px] max-w-[37px] max-h-[37px]',
  variants: {
    active: {
      true: 'border-purple-700 dark:border-purple-700 px-[9px] py-[8px]',
      
    },
    done: {
      true: 'border-purple-700 dark:border-purple-700 '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});

export function ContentModule({ children, className, name, done, active, index, open, onClick,onActive, lessons,  lessonsDone, addLesson }:ContentModuleProps) {
  const [indexActive, setIndexActive] = useState<number>(9999);

  const handleActive = (index: number) => {
    setIndexActive(index === indexActive ? 99999 : index)
    !active && onActive()
  };
  
  const itemsOndData = Object.keys(lessons).length;


  useEffect(()=>{
    if(!active) {
      setIndexActive(99999)
    }

},[active]);
  return(
    <div className={`overflow-hidden  ${(index !== 1) && ' border-t-2 border-t-zinc-200 dark:border-t-zinc-800 '} `}>
      <div className={moduleContainer({open, active})} onClick={onClick}>
        <span className={moduleCircle({active, done})}>
          {(!active && done) || (!active && !done ) ? index : ''}
          {active && <PauseIcon className="w-4 h-4 "/>}
        </span>
        <span className="pr-4 line-clamp-2 ">{ name }</span>
        <ChevronLeftIcon className={`absolute right-4 w-5 h-5   transition-all transform duration-300 ${open ? "-rotate-90" : ""}`}/>
      </div>
      <div className={`px-[35.5px] overflow-hidden  ${open ? '' : ' '}`}>
        <ol className={`relative   transition-all duration-500 ease-in-out ${open ? ' max-h-96' : 'max-h-0 '}`}>  
          {lessons.map((item, i) => ( 
            <> 
              <ContentLesson
              index={i}
              active={i === indexActive}
              done={(lessonsDone && !!lessonsDone.lessons.find(item => item === i + 1))}
              name={item.name}
              onClick={() => handleActive(i)}
              onDone={() => addLesson({index, lessons: [i+1]})}
              href={'#'}
              
            />
             {itemsOndData - index < 2 ? null : <span></span> }
            </>
          ))}                  
        </ol>
      </div>
    </div>
  );
}