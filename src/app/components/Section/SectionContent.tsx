"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import React from "react";
import { tv } from "tailwind-variants";
import { SectionContext } from "./SectionRoot";

const sectionStyle = tv({
  base: "pb-4",
  variants: {
    hasDivider: {
      true: "border-[#1f1f1f]/10 dark:border-[#363636] border-b-2",
    },
    done: {
      true: " ",
    },
  },
  defaultVariants: {
    hasDivider: false,
    done: false,
  },
});

interface SectionContentProps {
  children: ReactNode[] | ReactNode;
}

function SectionContent({ children }: SectionContentProps) {
  const context = useContext(SectionContext);

  if (!context) return null;

  return (
    <div className={sectionStyle({ hasDivider: context.hasDivider })}>
      {children}
    </div>
  );
}

export default SectionContent;
