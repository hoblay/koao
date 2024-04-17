"use client";
import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import React from "react";
import { tv } from "tailwind-variants";

const dropdownStyle = tv({
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

interface DropdownRootProps {
  children: ReactNode[];
  type?: "menu" | "listbox";
  trigger?: "press" | "longPress";
  isDisabled?: boolean;
  closeOnSelect?: boolean;
}
interface DropdownContextProps {
  isDropdownOpen: boolean;
  handleDropdown: () => void;
  closeDropdown: () => void;
}

export const DropdownContext = createContext<DropdownContextProps | null>(null);

function DropdownRoot({
  children,
  type,
  trigger,
  isDisabled,
  closeOnSelect,
}: DropdownRootProps) {
  const [isDropdownOpen, setisDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOnOutsideClick(dropdownRef, () => {
    if (isDropdownOpen) setisDropdownOpen(false);
  });

  const handleDropdown = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setisDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <div className="max-w-full w-full h-full scrollbar-hide overflow-x-scroll">
        <DropdownContext.Provider
          value={{ isDropdownOpen, handleDropdown, closeDropdown }}
        >
          {children}
        </DropdownContext.Provider>
      </div>
    </div>
  );
}

export default DropdownRoot;
