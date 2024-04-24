"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/Modal/Modal";

function SignDialog() {
  const { data: session, status } = useSession();

  if (session?.user) {
    return null;
  }
  return (
    <div className="fixed bottom-0 w-full z-50 px-9 py-6 bg-[#015f43] flex justify-between items-center">
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
        <Modal />
      </div>
    </div>
  );
}

export default SignDialog;
