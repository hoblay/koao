"use client";
import { HomeIcon, PlayIcon, GearIcon, ExitIcon, BackpackIcon, MixerHorizontalIcon, ArrowLeftIcon, ChevronDownIcon, PauseIcon } from "@radix-ui/react-icons"
import { SideBar } from "../components/SideBar"
import Link from "next/link";
import { Search } from "../components/Search/Index";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Content } from "../components/Content (deprecated)/index";
import ClassContent from "../components/ClassContent/ClassContent";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDropdownOpen, setisDropdownOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleDropdown = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setisDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutSideClick = (event:any) => {
      if (!ref.current?.contains(event.target)) {
        closeDropdown()
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div className="relative flex">
     
      <main className="w-full">
        {children}
      </main>
    </div>
  )}