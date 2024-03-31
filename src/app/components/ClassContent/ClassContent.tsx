import React, { useEffect, useRef, useState } from 'react'
import { Accordion } from '../Accordion'
import { tv } from 'tailwind-variants';
import Link from 'next/link';
import { PauseIcon, Pencil1Icon } from '@radix-ui/react-icons';

import { Course } from '@/app/Data/Courses';
import { IconEye, IconPlayerPause, IconPlayerPauseFilled } from '@tabler/icons-react';

const moduleCircle = tv({
  base: ' w-9 h-9 rounded-full p-1 border-2 border-zinc-300 text-zinc-600 dark:text-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 items-center justify-center',
  variants: {
    active: {
      true: 'border-purple-500 text-purple-900  dark:text-zinc-100 dark:border-purple-700',
      
    },
    done: {
      true: 'border-purple-500 text-purple-900 dark:text-zinc-100  dark:border-purple-700 '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});

const lessonStyle = tv({
  base: 'absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-[13px] ring-4 ring-zinc-50 dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800 dark:bg-zinc-800   cursor-pointer transition-all duration-150 ease-in-out',
  variants: {
    active: {
      true: 'ring-purple-500 dark:ring-purple-700 hover:ring-8 hover:ring-purple-500/30 dark:hover:ring-purple-700/30 dark:bg-zinc-800 ',
      
    },
    done: {
      true: 'ring-zinc-50 dark:ring-zinc-900 hover:ring-8 bg-purple-500 dark:bg-purple-900 '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});


interface LessonsDoneProps {
  index?: number,
  name?: string,
  lessons: {name?: string}[] | number[] 
}

function ClassContent() {
  const [coursePercentage, setCoursePercentage] = useState<number>(0);
  const [lessonsDone, setLessonsDone] = useState<{index:number ,lessons: number[]}[]>([]);
  const [indexActive, setIndexActive] = useState<number>(9999);
  const [lesseonIndexActive, setlessonIndexActive] = useState<number>(999);


  /* TODO: Make the container scrooll to the lesson when clicked */
  const listItems = useRef(null);


  const markAsActive = (indexParent: number, indexLesson: number) => {

    //Mark the module as active
    setIndexActive(prev => (indexParent === prev ? prev : indexParent));
  
    indexParent === indexActive
      ? setlessonIndexActive(indexLesson === lesseonIndexActive ? indexLesson : indexLesson)
      : setlessonIndexActive(indexLesson === lesseonIndexActive ? indexLesson : indexLesson);
    
  };

  const markAsDone = (lesson: {index:number, lessons: number[]}) => {

    // adds it to the array if there's no lesson of the same module done
    !(lessonsDone.findIndex(item => item.index === lesson.index) !== -1) 
      ? setLessonsDone([...lessonsDone, lesson])

      // if there's a lesson of the same module done
      : lessonsDone.forEach((element, index) => {

          // if the lesson belongs to the same module
          if(element.index === lesson.index) {

            
            const deletedIndex = element.lessons.findIndex(item => item === lesson.lessons[0]);
              
              // removes it from the array if the lesson already exists 
              if (deletedIndex > -1) {
                  let filteredLessons = element.lessons.filter((value, i:number) => i !== deletedIndex)
                  lessonsDone[index].lessons = [...filteredLessons];
                
                setLessonsDone([...lessonsDone])
              }

              // ads it to the array if the lesson doesn't exist
              else {
                lessonsDone[index].lessons = [...lessonsDone[index].lessons, lesson.lessons[0]];
                setLessonsDone([...lessonsDone])
              }
        
          }
    });   
  }


  const checkDoneModule = (courseModule:LessonsDoneProps, index:number) => {
    return ((!!lessonsDone.find(el => el.index === index + 1)) && (lessonsDone.find(ol => ol.index === index + 1))?.lessons.length === courseModule.lessons.length)
  }

  const checkDoneLesson = (parentIndex:number, index:number) => {
    let lessonModule = lessonsDone.find(item => item.index ===parentIndex + 1)

    return (lessonModule && !!lessonModule.lessons.find(item => item === index + 1))
  }

  const lessonsNumber = Object.keys(Course).length;
  
  useEffect(()=>{

    let percentagePerModule = 100 / lessonsNumber

    let percentagePerLesson;


    let finalPercentage = 0

    lessonsDone.forEach(lessonModule => {
      Course.forEach(courseModule => {
        if (lessonModule.index === courseModule.index) {

          percentagePerLesson = percentagePerModule / courseModule.lessons.length * lessonModule.lessons.length
          finalPercentage = finalPercentage + percentagePerLesson;

        }
      });
    });

    setCoursePercentage(finalPercentage);
    
  },[lessonsDone, lessonsNumber]);

  return (
    <div className={`h-[calc(100vh-40px)] overscroll-x-none overscroll-y-none rounded-xl overflow-y-auto overflow-hidden bg-zinc-50 dark:bg-zinc-900 no-scrollbar w-[350px] shadow-sm`}>
      <div className="sticky top-0 bg-zinc-50 dark:bg-zinc-900 z-50 px-8 py-5">
        <h2 className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing.</h2>
        <div className={`mt-3 w-full bg-zinc-200 rounded dark:bg-zinc-700 my-2`} >
          <div className={`bg-purple-300 dark:bg-purple-700 text-xs font-medium text-purple-950 dark:text-zinc-100 text-center p-0.5 leading-none rounded whitespace-nowrap transition-[width] duration-300 ease-in-out`} style={{width: `${coursePercentage}%` }} > 
            {Math.round(coursePercentage)}% Completado
          </div>
        </div>
      </div>
      
      
      <div className="bg-zinc-100 dark:bg-zinc-950/25 p-2">
        <Accordion.Root className=''>
          {Course.map((item, index) => (
            
            <>
              <Accordion.Item startContent={
                <div className={moduleCircle({active: (index === indexActive), done: (checkDoneModule(item,index))})}>
                  <div className='flex items-center text-center justify-center'>{(index === indexActive ? <IconPlayerPause className='m-1 w-4 h-4'/> : item.index)}</div>
                </div>
                } index={item.index} title={item.name}>
                <div className="py-0 px-7" ref={listItems}>
                  <ol className="relative">
                  {item.lessons.map((lesson, i) => ( 
                    <> 
                      <li className= {`pb-4 p-1  border-s-2 pl-7 -ml-[2px] pt-3 ${checkDoneLesson(index, i) ? 'border-purple-500 dark:border-purple-700 ' : 'border-zinc-200 dark:border-zinc-700'}`} >
                        <span className={lessonStyle({active: (i === lesseonIndexActive && index === indexActive), done: (checkDoneLesson(index, i))})} onClick={() => markAsDone({index: item.index, lessons: [1+i]})}>
                            <span className="text-xs text-purple-800 dark:text-zinc-50" >
                                {(i === lesseonIndexActive && index === indexActive) ? <IconEye className='w-3 h-3'/> : i + 1}
                            </span>
                        </span>
                        <Link href={'#'} className="">
                          <h3 className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300" onClick={() => markAsActive(index, i)}>
                            {lesson.name}
                          </h3>
                        </Link>
                      </li>
                      </>
                    ))} 
                  </ol>
                </div>
              </Accordion.Item>
            </>
          ))}
          
        </Accordion.Root>
      </div>


    </div>
  )
}

export default ClassContent