import React, { ReactNode } from 'react'
import { tv } from 'tailwind-variants';

const CardRootStyle = tv({
  base: 'flex flex-col relative h-auto text-zinc-600 dark:text-zinc-100 box-border outline-none bg-zinc-50 dark:bg-zinc-900 ',
  variants: {
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg'
      
    },
    rounded: {
      none: '',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl'
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  defaultVariants: {
    shadow: 'sm',
    rounded: 'lg',
    fullWidth: false
  }
});

interface CardRootProps{
  children?: ReactNode | ReactNode[],
  shadow?:	'none' | 'sm' | 'md' | 'lg',
  rounded?:	'none' | 'sm' | 'md' | 'lg',	
  fullWidth?: boolean,
  isDisabled?: boolean,
  className?:	string,


}


function CardRoot({children, shadow, rounded, fullWidth, isDisabled, className}:CardRootProps) {
  return (
    <div className={CardRootStyle({shadow, rounded, fullWidth, class: className  })}>
      {children}
    </div>
  )
}

export default CardRoot