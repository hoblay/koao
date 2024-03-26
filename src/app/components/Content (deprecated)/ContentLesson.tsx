
import { PauseIcon, Pencil1Icon, Pencil2Icon, PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { title } from "process";
import { ElementType, ReactNode, useEffect, useState } from "react";
import { useContext } from 'react';
import { tv } from "tailwind-variants";

interface ContentLessonProps{
  name: string,
  active: boolean,
  done: boolean,
  index: number, 
  href: string,
  onClick: () => void,
  onDone: () => void,
}

const lesson = tv({
  base: 'absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-[13px] ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800   cursor-pointer transition-all duration-150 ease-in-out',
  variants: {
    active: {
      true: ' dark:ring-purple-700 hover:ring-8 dark:hover:ring-purple-700/30 dark:bg-zinc-800 ',
      
    },
    done: {
      true: 'ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-purple-900 '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});


export function ContentLesson({ name, active, done, href, index, onClick, onDone}:ContentLessonProps) {

  const [isDone, setisDone] = useState<boolean>(done);


  const handleDone = () => {
    onDone();

    
  };

  const handleActive = () => {
    setisDone(false);
    onClick();
  };

  
  


  return(
    
    <>
      
        <li className= {`pb-4 p-1  border-s-2 pl-7 -ml-[2px]  ${done ? 'border-purple-500 dark:border-purple-700 ' : 'border-zinc-200 dark:border-zinc-700'} pt-3`} >
          <span className={lesson({active: active, done: done})} onClick={handleDone}>
              <span className="text-xs text-purple-800 dark:text-zinc-50" >
                  { active ? <Pencil1Icon className="w-3 h-3"/> : index + 1}
              </span>
          </span>
          <Link href={'#'} className="">
          <h3 className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300" onClick={handleActive}>{ name }</h3>
          </Link>
        </li>
    </>
  );
}
