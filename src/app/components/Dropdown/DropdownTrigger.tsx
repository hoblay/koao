"use client";
import { ReactNode, useContext } from "react";
import React from 'react'
import { tv } from "tailwind-variants";
import { DropdownContext } from "./DropdownRoot";

const dropdownTriggerStyle = tv({
  base: '',
  variants: {
    active: {
      true: '',
      
    },
    done: {
      true: ' '
    }
  },
  defaultVariants: {
    active: false,
    done: false
  }
});

interface DropdownTriggerProps{
  children:	ReactNode
}

export default function DropdownTrigger({children}:DropdownTriggerProps){
  const context  = useContext(DropdownContext);

  if(!context) return null;

  return (
    <div className='flex h-full w-full ' onClick={() => context.handleDropdown()}>
      {children}
    </div>
  )
}