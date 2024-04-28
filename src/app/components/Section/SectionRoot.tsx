"use client";
import { ReactNode, createContext, useState } from "react";
import React from "react";
import { tv } from "tailwind-variants";

const sectionStyle = tv({
  base: "",
  variants: {
    active: {
      true: "",
    },
    done: {
      true: " ",
    },
  },
  defaultVariants: {
    active: false,
    done: false,
  },
});
interface SectionContextProps {
  hasDivider?: boolean;
}

export const SectionContext = createContext<SectionContextProps | null>(null);
interface SectionRootProps {
  children: ReactNode[] | ReactNode;
  divider?: boolean;
}

function SectionRoot({ children, divider }: SectionRootProps) {
  return (
    <div className="flex flex-col gap-4 px-9">
      <SectionContext.Provider value={{ hasDivider: divider }}>
        {children}
      </SectionContext.Provider>
    </div>
  );
}

export default SectionRoot;
