"use client";
import { ReactNode, createContext, useState } from "react";
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
  children: ReactNode[];
  type?: "menu" | "listbox";
  trigger?: "press" | "longPress";
  isDisabled?: boolean;
  closeOnSelect?: boolean;
}
interface ModalContextProps {
  isModalOpen: boolean;
  handleModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

function ModalRoot({
  children,
  type,
  trigger,
  isDisabled,
  closeOnSelect,
}: ModalRootProps) {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setisModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  return (
    <div className="relative">
      <ModalContext.Provider value={{ isModalOpen, handleModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    </div>
  );
}

export default ModalRoot;
