import React, { ReactNode } from "react";
import { Card } from "../Card";
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import LogoIcon from "../Icons/Logo";

interface CardWrapperProps {
  children?: ReactNode | ReactNode[];
  headerLabel?: string;
  showSocial?: boolean;
  step?: number;
  email?: string;
  name?: string;
}

function CardWrapper({
  children,
  headerLabel,
  showSocial,
  name,
  email,
  step,
}: CardWrapperProps) {
  return (
    <Card.Root className="w-[360px] p-6" shadow="none" bg={false}>
      <Card.Header className="flex flex-col gap-4 items-center text-center justify-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">
            {step === 0
              ? headerLabel
              : step === 1
                ? `Oi de novo, ${name}`
                : step === 2
                  ? "Cria una palavra-passe"
                  : step === 3
                    ? "Finalmente, Qual é o teu nome?"
                    : `Aguarde um instante ${name}`}
          </h1>
          {step === 1 && (
            <p className="text-[.875rem] text-zinc-500 dark:text-zinc-400">
              <span>Inicia sessão com a senha de </span>
              <b>{email}</b>
            </p>
          )}
          {step === 2 && (
            <p className="text-[.875rem] text-zinc-500 dark:text-zinc-400">
              Deve tener no minimo 10 caracteres.
            </p>
          )}
          {step === 3 && (
            <p className="text-[.875rem] text-zinc-500 dark:text-zinc-400">
              Escreve da maneira que vai aparecer nos certificados.
            </p>
          )}
          {step === 4 && (
            <p className="text-[.875rem] text-zinc-500 dark:text-zinc-400">
              Estamos a preparar tudo pra ti.
            </p>
          )}
        </div>
      </Card.Header>
      <Card.Body className="py-2">{children}</Card.Body>
      {step === 0 && (
        <Card.Footer className="">
          <div className="items-center justify-center flex">
            <div className="relative flex py-5 items-center w-full">
              <div className="flex-grow border-t border-[#363636]"></div>
              <span className="flex-shrink mx-4 text-zinc-400">
                Ou se preferir
              </span>
              <div className="flex-grow border-t border-[#363636]"></div>
            </div>
          </div>
          <button className="py-3 w-[100%] items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md">
            <IconBrandGithubFilled />
          </button>
        </Card.Footer>
      )}
    </Card.Root>
  );
}

export default CardWrapper;
