import Tag from "@/app/components/Tag/Tag";
import {
  IconAuth2fa,
  IconLockPin,
  IconMailPin,
  IconMessagePin,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="relative p-4 gap-4 flex flex-col">
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex flex-col text-start">
            <h2 className=" text-[17px] font-semibold ">
              Palavra-passe e Autentificação
            </h2>
            <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
              Conserve a sua rutina sincronizando os seus caledarios.
            </h3>
          </div>
        </div>

        <div className="flex w-full items-center justify-between px-4 pb-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">Palavra-passe</h2>
            </div>
          </div>
          <Tag
            name="Mudar a palavra-passe"
            startContent={<IconLockPin className="size-5" />}
          />
        </div>
      </div>
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">
                Dupla autentificação
              </h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Two factor autentication ou (2FA) é uma boa maneira de adicionar
                outra capa de segurança na tua conta.
              </h3>
            </div>
          </div>
          <Tag
            name="Adicionar autentificação"
            startContent={<IconAuth2fa className="size-5" />}
          />
        </div>
      </div>
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">
                Verificação por SMS
              </h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Adicione o seu numero de telefone pra ter outra via de accesso
                em caso de não poder entrar na sua conta.
              </h3>
            </div>
          </div>
          <Tag
            name="Adicionar numero"
            startContent={<IconMessagePin className="size-5" />}
          />
        </div>
      </div>
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">
                Verificação por Email
              </h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Adicione um segundo email pra ter outra via de accesso em caso
                de não poder entrar na sua conta.
              </h3>
            </div>
          </div>
          <Tag
            name="Adicionar e-mail"
            startContent={<IconMailPin className="size-5" />}
          />
        </div>
      </div>
    </div>
  );
}
