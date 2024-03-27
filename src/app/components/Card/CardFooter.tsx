import React, { ReactNode } from 'react'
import { tv } from 'tailwind-variants';

const CardFooterStyle = tv({
  base: ' overflow-hidden h-auto ',
  variants: {
    
  },
  defaultVariants: {
    
  }
});

interface CardFooterProps{
  children?: ReactNode | ReactNode[],
  showDivider?: boolean,
  className?:	string,


}

function CardFooter({children, showDivider, className}:CardFooterProps) {
  return (
    <>
        {showDivider && <hr className="shrink-0 bg-zinc-200 dark:bg-zinc-800 border-none w-full h-[1px] my-1" role="separator"></hr>}
        <div className={CardFooterStyle({class: className})}>
          {children}
        </div>
        
    </>
  )
}

export default CardFooter