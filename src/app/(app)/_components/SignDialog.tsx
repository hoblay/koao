"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

function SignDialog() {
  const { data: session, status } = useSession();

  if (session?.user) {
    return null;
  }
  return (
    <div className="fixed bottom-0 w-full px-9 py-6 bg-[#015f43] flex justify-between items-center">
      <div className="flex flex-col">
        <h2 className=" text-[17px] text-zinc-50 font-semibold flex gap-2 items-center">
          Todos os nossos cursos. Apenas na nossa plataforma.
        </h2>
        <p className=" text-sm flex gap-2 items-center text-zinc-300">
          Comece a ver com sete dias grátis. Também pode obter três meses grátis
          em caso de pertencer a uma das nossas instituições.
        </p>
      </div>
      <div className="">
        <Link href="/signin" className="">
          <button
            type="button"
            className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-zinc-50 hover:bg-[#1f1f1f] text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
          >
            <div className="flex flex-1 justify-center items-center gap-2">
              <span className="text-base leading-6 text-nowrap">
                Começar periodo gratis
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignDialog;
