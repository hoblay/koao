import React, { ReactNode } from 'react'
import { tv } from 'tailwind-variants';

const CardHeaderStyle = tv({
  base: ' h-auto ',
  variants: {
    
  },
  defaultVariants: {
    
  }
});

interface CardHeaderProps{
  children?: ReactNode | ReactNode[],
  showDivider?: boolean,
  className?:	string,


}

function CardHeader({children, showDivider, className}:CardHeaderProps) {
  return (
    <>
        <div className={CardHeaderStyle({class: className})}>
          {children}
        </div>
        {showDivider && <hr className="shrink-0 bg-zinc-200 dark:bg-zinc-800 border-none w-full h-[1px] my-1" role="separator"></hr>}
    </>
  )
}

export default CardHeader