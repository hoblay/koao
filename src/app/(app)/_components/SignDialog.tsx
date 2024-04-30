"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { Modal } from "@/app/components/Modal";
import SignIn from "@/app/(auth)/signin/page";
import LogoIcon from "@/app/components/Icons/Logo";
import Button from "@/app/components/Button/Button";

function SignDialog() {
  const { data: session, status } = useSession();

  if (session?.user) {
    return null;
  }
  return (
    <div className="fixed bottom-0 w-full z-50 px-10 py-3 bg-[#015f43] flex justify-between items-center">
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
        <Modal.Root>
          <Modal.Trigger>
            <div className="flex">
              <Button
                subtitle="7 dias grátis e depois 5.000&nbsp;AKZ / mês"
                size="sm"
              >
                Começar periodo gratis
              </Button>
            </div>
          </Modal.Trigger>
          <Modal.Content className="h-full">
            <div className="pt-6">
              <Link
                href={"/"}
                className="flex gap-2 items-center py-3 absolute top-6 left-32"
              >
                <LogoIcon width="34" height="22" className="#015F43" />
                <span
                  className={` text-xl font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap`}
                >
                  Logotipo
                </span>
              </Link>
              <SignIn />
            </div>
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
}

export default SignDialog;
