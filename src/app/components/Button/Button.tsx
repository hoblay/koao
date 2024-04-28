import React, { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
const buttonStyle = tv({
  base: "relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer",
  variants: {
    size: {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-2 px-2",
      md: "text-base py-2.5 px-2.5",
      lg: "text-lg py-3 px-5",
      xl: "px-8 py-4 text-xl",
    },
    fullWidth: {
      true: "w-full",
    },
    color: {
      white: " bg-zinc-50  hover:bg-[#1f1f1f] text-[#143229] hover:text-white",
      green:
        "bg-[#143229] text-white dark:bg-zinc-50  dark:hover:bg-[#1f1f1f] dark:text-[#143229] dark:hover:text-white",
    },
  },
  defaultVariants: {
    size: "md",
    color: "white",
    fullWidth: false,
  },
});
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  subtitle?: string;
  fullWidth?: boolean;
}

function Button(props: ButtonProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-center">
        <button
          type="button"
          {...props}
          className={buttonStyle({
            size: props.size,
            fullWidth: props.fullWidth,
          })}
        >
          <div className="flex flex-1 justify-center items-center gap-2">
            <span className=" leading-6 text-nowrap inline-flex gap-1 justify-center items-center">
              {props.children}
            </span>
          </div>
        </button>
      </div>
      {props.subtitle && (
        <p className="text-xs text-center">{props.subtitle}</p>
      )}
    </div>
  );
}

export default Button;
