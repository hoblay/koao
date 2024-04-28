import { ReactNode } from "react";
import React from "react";
import { tv } from "tailwind-variants";

const sectionTitleStyle = tv({
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

interface SectionTitleProps {
  children: ReactNode[] | ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className=" text-[17px] font-semibold flex gap-2 items-center">
      {children}
    </h2>
  );
}

export default SectionTitle;
