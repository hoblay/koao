import SignIn from "@/app/(auth)/signin/page";
import Link from "next/link";
import React, { useState } from "react";
import LogoIcon from "../Icons/Logo";
import { IconX } from "@tabler/icons-react";

const Modal = () => {
  const [openModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!openModal);
  };
  return (
    <div className="z-50">
      <button
        type="button"
        className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-[#1f1f1f] text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
        onClick={handleModal}
      >
        <div className="flex flex-1 justify-center items-center gap-2">
          <span className="text-base leading-6 text-nowrap">
            Começar periodo gratis
          </span>
        </div>
      </button>

      {openModal && (
        <div className="fixed top-0 left-0 w-full z-50 h-[100vh] bg-zinc-950/70 flex justify-center items-center">
          <div className="relative px-5  h-[410px] flex flex-col justify-center items-center bg-zinc-100 dark:bg-[#1f1f1f] z-50 shadow-lg  rounded-xl">
            <Link
              href={"/"}
              className="flex gap-2 items-center py-3 absolute top-6 "
            >
              <LogoIcon width="34" height="22" className="#015F43" />
              <span
                className={` text-xl font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap`}
              >
                Logotipo
              </span>
            </Link>
            <span
              className="p-2 rounded-full bg-[#363636]/70 dark:bg-[#363636]  hover:bg-[#363636]/50  absolute top-4 left-4 cursor-pointer"
              onClick={handleModal}
            >
              <IconX className="size-4 text-zinc-50" />
            </span>
            <div className="flex pt-12">
              <SignIn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
