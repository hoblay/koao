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

interface SectionSubtitleProps {
  children: ReactNode[] | ReactNode;
}

function SectionSubtitle({ children }: SectionSubtitleProps) {
  return (
    <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
      {children}
    </h3>
  );
}

export default SectionSubtitle;
