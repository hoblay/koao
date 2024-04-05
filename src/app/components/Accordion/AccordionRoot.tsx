"use client";
import React, { ReactNode, useState } from 'react'
import { tv } from 'tailwind-variants';

import { createContext } from 'react';


interface AccordionProps {
  children?: ReactNode | ReactNode[],
  isDisabled?: boolean,
  selectionMode?: 	'none' | 'single' | 'multiple',
  className?: string
}

const Accordion = tv({
  base: 'p-2 flex flex-col gap-1 w-full max-w-[350px] rounded-lg',
  variants: {
    isDisabled: {
      true: '',
      
    },
    selectionMode: {
      none: '',
      single: '',
      multiple: '',
    }
  },
  defaultVariants: {
    idDisabled: false,
    selectionMode: 'single'
  }
});

interface AccContext{
  indexopen: number,
  onClick: (index: number) => void
}

export const AccordionContext = createContext<AccContext | null>(null);


function AccordionRoot({children, isDisabled, selectionMode, className}:AccordionProps) {
  const [indexopen, setIndexOpen] = useState<number>(99999);

  const handleClick = (index: number) => {
    setIndexOpen(index === indexopen ? 99999 : index);
  };
  return (
    <div className={Accordion({isDisabled, selectionMode, class: className})}>
      <AccordionContext.Provider value={{ indexopen, onClick: handleClick }}>
        {children}
      </AccordionContext.Provider>
    </div>
  )
}

export default AccordionRoot


              