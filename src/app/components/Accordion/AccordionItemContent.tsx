import Link from 'next/link'
import React from 'react'

function AccordionItemContent() {
  return (
    <div className=" text-small" >
      <div className="py-0 px-7">
      <ol className="relative">
        <li className= {`pb-4 p-1  border-s-2 pl-7 -ml-[2px] border-zinc-200 dark:border-zinc-700 pt-3`} >
          <span className={'absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-[13px] ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800   cursor-pointer'} >
              <span className="text-xs text-purple-800 dark:text-zinc-50" >
                  1
              </span>
          </span>
          <Link href={'#'} className="">
          <h3 className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300" >Lorem ipsum dolor sit amet.</h3>
          </Link>
        </li>
        <li className= {`pb-4 p-1  border-s-2 pl-7 -ml-[2px] border-zinc-200 dark:border-zinc-700 pt-3`} >
          <span className={'absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-[13px] ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800   cursor-pointer'} >
              <span className="text-xs text-purple-800 dark:text-zinc-50" >
                  1
              </span>
          </span>
          <Link href={'#'} className="">
          <h3 className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptas rerum quas nam reprehenderit!</h3>
          </Link>
        </li>
        <li className= {`pb-4 p-1  border-s-2 pl-7 -ml-[2px] border-zinc-200 dark:border-zinc-700 pt-3`} >
          <span className={'absolute flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full -start-[13px] ring-4 ring-white dark:ring-zinc-900 hover:ring-8 dark:bg-zinc-800   cursor-pointer'} >
              <span className="text-xs text-purple-800 dark:text-zinc-50" >
                  1
              </span>
          </span>
          <Link href={'#'} className="">
          <h3 className="flex items-center text-sm text-zinc-900 dark:text-white dark:hover:text-zinc-300" >Lorem ipsum dolor sit amet.</h3>
          </Link>
        </li>
      </ol>
      </div>
      
    </div>
  )
}

export default AccordionItemContent