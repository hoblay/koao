"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import React from "react";
import { tv } from "tailwind-variants";

const modalStyle = tv({
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

interface ModalRootProps {
  children: ReactNode | ReactNode[];
  type?: "menu" | "listbox";
  trigger?: "press" | "longPress";
  isDisabled?: boolean;
  closeOnSelect?: boolean;
  onClose: () => void;
  isOpen: boolean;
}
interface ModalContextProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

function ModalRoot({
  children,
  type,
  trigger,
  isDisabled,
  closeOnSelect,
  isOpen,
  onClose,
}: ModalRootProps) {
  return (
    <div className="relative z-50">
      <ModalContext.Provider
        value={{ isModalOpen: isOpen, closeModal: onClose }}
      >
        {children}
      </ModalContext.Provider>
    </div>
  );
}

export default ModalRoot;
