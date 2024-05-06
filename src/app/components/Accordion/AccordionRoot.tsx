"use client";
import React, { ReactNode, useState } from "react";
import { tv } from "tailwind-variants";

import { createContext } from "react";

interface AccordionProps {
  children?: ReactNode | ReactNode[];
  isDisabled?: boolean;
  selectionMode?: "none" | "single" | "multiple";
  className?: string;
  removable?: boolean;
  indexOpen?: number;
}

const Accordion = tv({
  base: "p-2 flex flex-col gap-1 w-full max-w-[350px] rounded-lg ",
  variants: {
    isDisabled: {
      true: "",
    },
    selectionMode: {
      none: "",
      single: "",
      multiple: "",
    },
  },
  defaultVariants: {
    idDisabled: false,
    selectionMode: "single",
  },
});

interface AccContext {
  indexopen: number;
  onClick: (index: number) => void;
  removable: boolean;
}

export const AccordionContext = createContext<AccContext | null>(null);

function AccordionRoot({
  children,
  isDisabled,
  selectionMode,
  className,
  removable = false,

  indexOpen = 99999,
}: AccordionProps) {
  const [indexopen, setIndexOpen] = useState<number>(indexOpen);

  const handleClick = (index: number) => {
    setIndexOpen(index === indexopen ? 99999 : index);
  };
  return (
    <div className={Accordion({ isDisabled, selectionMode, class: className })}>
      <AccordionContext.Provider
        value={{ indexopen, onClick: handleClick, removable }}
      >
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

export default AccordionRoot;
