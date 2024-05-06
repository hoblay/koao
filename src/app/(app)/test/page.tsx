"use client";
import SignIn from "@/app/(auth)/signin/page";
import Button from "@/app/components/Button/Button";
import { Dropdown } from "@/app/components/Dropdown";
import { Modal } from "@/app/components/Modal";
import { Section } from "@/app/components/Section";
import Tag from "@/app/components/Tag/Tag";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  IconArrowRight,
  IconAuth2fa,
  IconDots,
  IconEdit,
  IconEditCircle,
  IconEye,
  IconMail,
  IconMessageReport,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
  const [opened, { open, close }] = useDisclosure();
  return (
    <div className=" py-[708px] flex flex-col gap-6">
      <Button onClick={() => open()}>Aperta</Button>
      <div className="relative flex p-96">
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button className="p-2 border border-[#1f1f1f]/10 dark:border-[#363636] rounded-xl hover:bg-zinc-50 dark:hover:bg-[#363636]">
              <IconDots />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Section>
              <Dropdown.Item
                title="Previzualizar"
                description={"Ver o curso "}
                startContent={<IconEye className="text-zinc-600" />}
              />
              <Dropdown.Item
                title="Editar"
                description={"Aperte para editar"}
                startContent={<IconEdit className="text-zinc-600" />}
              />
              <Dropdown.Item
                title="Eliminar"
                description={"Aperte para eliminar"}
                startContent={<IconTrash className="text-red-500" />}
              />
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Root>
      </div>
      <Modal.Root isOpen={opened} onClose={() => close()}>
        <Modal.Content className="h-full p-0 justify-center items-center">
          <IconMessageReport className="size-8 text-red-600 absolute top-6 left-[200px]" />
          <div className=" w-[400px] px-4 pb-4 pt-2 flex flex-col text-center gap-3">
            <div className="flex flex-col gap-4 pt-4 relative">
              <h2 className="text-2xl font-semibold">O quê que aconteceu?</h2>
              <textarea
                name="Error"
                placeholder="Nos conte o que aconteceu..."
                className=" min-h-[158px]  p-2.5 justify-between w-full font-normal relative flex items-center gap-3 dark:bg-[#363636] border border-[#1f1f1f]/10 dark:border-[#363636] dark:hover:bg-[#1f1f1f] dark:focus:bg-[#1f1f1f]   rounded-md  motion-reduce:transition-none !duration-150 outline-none  dark:placeholder:text-zinc-500 dark:text-zinc-100 box-border shadow-sm transition-all focus-visible:shadow-md focus:ring-[#363636] focus:ring-[1px] focus-visible:ring-background-control  group border-control"
              />
              <Button fullWidth size="lg">
                <span className="text-base">Reportar</span>
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}
