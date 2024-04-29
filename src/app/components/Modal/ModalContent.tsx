"use client";
import { ReactNode, useContext, useRef } from "react";
import React from "react";
import { tv } from "tailwind-variants";
import { ModalContext } from "./ModalRoot";
import { IconX } from "@tabler/icons-react";
import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";

const modalContentStyle = tv({
  base: "fixed top-0 left-0 w-full z-50 h-[100vh] bg-zinc-950/70 flex justify-center items-center",
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
  },
  defaultVariants: {
    open: false,
  },
});

interface ModalContentProps {
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

export default function ModalContent({
  children,
  variant,
  color,
  className,
}: ModalContentProps) {
  const context = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnOutsideClick(modalRef, () => {});
  if (!context) return null;
  if (!context.isModalOpen) null;

  return (
    <div
      className={modalContentStyle({
        open: context.isModalOpen,
        class: className,
      })}
    >
      <div
        className="relative px-5 py-5 flex flex-col justify-center items-center bg-zinc-100 dark:bg-[#1f1f1f] z-50 shadow-lg  rounded-xl"
        ref={modalRef}
      >
        <span
          className="p-2    absolute top-4 left-4 cursor-pointer"
          onClick={context.handleModal}
        >
          <IconX className="size-6 text-[#1f1f1f] hover:opacity-80 dark:text-zinc-50" />
        </span>
        <div className="flex pt-12">{children}</div>
      </div>
    </div>
  );
}
