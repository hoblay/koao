"use client";
import {
  IconCalendarMonth,
  IconLockSquareRoundedFilled,
  IconMailFilled,
  IconSignature,
} from "@tabler/icons-react";
import { InputHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

const InputStyle = tv({
  base: "justify-between w-full font-normal relative flex items-center shadow-sm gap-3 dark:bg-zinc-800 dark:hover:bg-zinc-950/40 dark:focus:bg-zinc-950/40   rounded-md transition-[background] motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100",
  variants: {
    size: {
      xs: "max-h-10 p-3 text-xs",
      sm: "",
      md: "h-[53px] px-3 text-sm min-h-12",
      lg: " ",
    },
    hasIcon: {
      true: "pl-[44px]",
    },
    bordered: {
      true: "border-zinc-800 border focus:border-zinc-800 focus:border-dashed dark:focus:bg-zinc-950",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children?: ReactNode | ReactNode[];
  sizes?: "xs" | "sm" | "md" | "lg";
  hasIcon?: boolean;
  bordered?: boolean;
}

export function FormInput(props: InputProps) {
  const { register } = useFormContext();

  return (
    <>
      {props.type === "select" ? (
        <select
          id={props.name}
          {...register(props.name)}
          className="flex-1 rounded border border-zinc-300 dark:border-zinc-800 shadow-sm px-3 py-2 text-zinc-800 dark:text-zinc-300 focus:outline-none focus:ring-0"
        >
          {props.children}
        </select>
      ) : (
        <div className="relative inline-flex w-full items-center h-full box-border">
          {props.type === "email" && (
            <IconMailFilled className="absolute top-[15px] left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0" />
          )}
          {props.name === "name" && (
            <IconSignature className="absolute top-[15px] left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0" />
          )}
          {props.type === "password" && (
            <IconLockSquareRoundedFilled className="absolute top-[15px] left-3 z-30 text-2xl dark:text-zinc-400 pointer-events-none flex-shrink-0" />
          )}

          <input
            id={props.name}
            {...register(props.name)}
            {...props}
            className={InputStyle({
              size: props.sizes,
              hasIcon: props.hasIcon,
              class: props.className,
              bordered: props.bordered,
            })}
          />
        </div>
      )}
    </>
  );
}

/*
*
*" text-xs w-full p-3 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30"

*
*
*



*/
