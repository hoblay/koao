import Avatar from "@/app/components/Avatar/Avatar";
import Button from "@/app/components/Button/Button";
import Tag from "@/app/components/Tag/Tag";
import { authOptions } from "@/server/auth";
import {
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandGoogle,
  IconBrandGoogleFilled,
  IconBrandNotion,
  IconCalendar,
  IconPhotoPlus,
  IconUserEdit,
} from "@tabler/icons-react";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="relative p-4 gap-4 flex flex-col">
      <div className="flex justify-between items-center min-w-[1084px] gap-4  rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex gap-4  px-6 py-6">
          <div className="flex relative">
            <Avatar
              name={session?.user.name}
              image={session?.user.image}
              size="xl"
              color={session?.user.color}
            />
            <div className="hidden absolute top-1  right-1   rounded-full p-2 text-white bg-[#363636]">
              <IconPhotoPlus className="size-6" />
            </div>
          </div>

          <div className="flex gap-10 text-start items-center">
            <div className="flex flex-col gap-2 text-start ">
              <div className="flex flex-col text-start ">
                <span className="text-base text-zinc-700 dark:text-zinc-200">
                  Nome:
                </span>
                <span className="text-base text-zinc-500 dark:text-zinc-400">
                  {session?.user.name}
                </span>
              </div>
              <div className="flex flex-col text-start ">
                <span className="text-base text-zinc-700 dark:text-zinc-200">
                  Email:
                </span>
                <span className="text-base text-zinc-500 dark:text-zinc-400">
                  {`${session?.user.email?.[0]}${session?.user.email?.[1]}${session?.user.email?.[2]}${session?.user.email?.[3]}`}
                  *******@
                  {session?.user.email.split("@")[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-start px-8">
          <Button>Editar dados</Button>
        </div>
      </div>
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex flex-col text-start">
            <h2 className=" text-[17px] font-semibold ">Conexões</h2>
            <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
              Conecte a sua conta com as ferramentas que usas no teu dia a dia.
            </h3>
          </div>
        </div>
        <div className="flex w-full items-center justify-between px-4 pb-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex">
              <IconBrandNotion className="size-20" />
            </div>
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">Notion</h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Conecte a sua conta com as ferramentas que usas no teu dia a
                dia.
              </h3>
            </div>
          </div>
          <Tag
            name="Conecte com Notion"
            startContent={<IconBrandNotion className="size-5" />}
          />
        </div>
        <div className="flex w-full items-center justify-between px-4 pb-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex p-4 rounded-xl bg-[#1f1f1f]">
              <IconBrandGithubFilled className="size-12 text-zinc-300" />
            </div>
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">Github</h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Conecte a sua conta com as ferramentas que usas no teu dia a
                dia.
              </h3>
            </div>
          </div>
          <Tag
            name="Conecte com Github"
            startContent={<IconBrandGithub className="size-5" />}
          />
        </div>
        <div className="flex w-full items-center justify-between px-4 pb-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex p-4 rounded-xl bg-[#1f1f1f]">
              <IconBrandGoogleFilled className="size-12 text-zinc-300" />
            </div>
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">Google</h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Conecte a sua conta com as ferramentas que usas no teu dia a
                dia.
              </h3>
            </div>
          </div>
          <Tag
            name="Conecte com Google"
            startContent={<IconBrandGoogle className="size-5" />}
          />
        </div>
      </div>
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex flex-col text-start">
            <h2 className=" text-[17px] font-semibold ">Rutina</h2>
            <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
              Conserve a sua rutina sincronizando os seus caledarios.
            </h3>
          </div>
        </div>
        <div className="flex w-full items-center justify-between px-4 pb-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <div className="flex gap-4 items-center">
            <div className="flex p-4 rounded-xl bg-emerald-950">
              <IconCalendar className="size-12 text-zinc-300" />
            </div>
            <div className="flex flex-col text-start">
              <h2 className=" text-[17px] font-semibold ">Google calendar</h2>
              <h3 className="text-sm flex gap-2 items-center dark:text-zinc-300 text-zinc-500">
                Conecte a sua conta com as ferramentas que usas no teu dia a
                dia.
              </h3>
            </div>
          </div>
          <Tag
            name="Sincronize com Google Calendar"
            startContent={<IconBrandGoogle className="size-5" />}
          />
        </div>
      </div>
    </div>
  );
}
