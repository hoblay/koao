"use client";
import { ReactNode, useContext } from "react";
import React from "react";
import { tv } from "tailwind-variants";
import { ModalContext } from "./ModalRoot";

const modalTriggerStyle = tv({
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

interface ModalTriggerProps {
  children: ReactNode;
}

export default function ModalTrigger({ children }: ModalTriggerProps) {
  const context = useContext(ModalContext);

  if (!context) return null;

  return (
    <div className="flex h-full w-full " onClick={() => context.handleModal()}>
      {children}
    </div>
  );
}
