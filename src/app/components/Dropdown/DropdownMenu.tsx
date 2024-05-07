"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import React from "react";
import { tv } from "tailwind-variants";
import { DropdownContext } from "./DropdownRoot";
import { useRect } from "@/hooks/useRect";

const dropdownMenuStyle = tv({
  base: "absolute  z-50 inline-flex flex-col items-center justify-center subpixel-antialiased outline-none box-border text-sm max-w-64 bg-zinc-50 dark:bg-[#292929]  border border-[#1f1f1f]/10 dark:border-[#363636] rounded-lg shadow-md w-full p-1 min-w-[200px] transition-all duration-150 ease-in-out",
  variants: {
    variant: {
      solid: "",
      bordered: "",
      light: "",
      flat: "",
      faded: "",
      shadow: "",
    },
    open: {
      true: "opacity-100",
      false: "opacity-0 -z-40 hidden",
    },
    positionY: {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
    },
    positionX: {
      left: "right-0",
      right: "left-0",
    },
  },
  defaultVariants: {
    open: false,
    positionY: "bottom",
    positionX: "left",
  },
});

interface DropdownMenuProps {
  children: ReactNode[] | ReactNode;
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
}

export default function DropdownMenu({
  children,
  variant,
  color,
  className,
}: DropdownMenuProps) {
  const context = useContext(DropdownContext);
  const [positionY, setPositionY] = useState<"top" | "bottom">("bottom");
  const [positionX, setPositionX] = useState<"left" | "right">("left");

  const ctx = context && context;
  useEffect(() => {
    if (ctx?.DropdownRect) {
      if (ctx.DropdownRect.bottom < 450) {
        setPositionY("bottom");
      } else {
        setPositionY("top");
      }
      if (ctx.DropdownRect.right < 182 + ctx.DropdownRect.width) {
        setPositionX("right");
      } else {
        setPositionX("left");
      }
    }
  }, [ctx?.isDropdownOpen]);
  if (!context) return null;
  return (
    <div
      className={dropdownMenuStyle({
        open: context.isDropdownOpen,
        class: className,
        positionY,
        positionX,
      })}
    >
      <div className="w-full relative flex flex-col gap-1 p-1">
        <ul className="w-full flex flex-col gap-0.5 outline-none">
          {children}
        </ul>
      </div>
    </div>
  );
}
