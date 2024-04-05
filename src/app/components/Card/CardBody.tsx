import React, { ReactNode } from 'react'
import { tv } from 'tailwind-variants';

const CardBodyStyle = tv({
  base: '  h-auto ',
  variants: {
    
  },
  defaultVariants: {
    
  }
});

interface CardBodyProps{
  children?: ReactNode | ReactNode[],
  className?:	string,


}

function CardBody({children, className}:CardBodyProps) {
  return (
    <>
        <div className={CardBodyStyle({class: className})}>
          {children}
        </div>
    </>
  )
}

export default CardBody