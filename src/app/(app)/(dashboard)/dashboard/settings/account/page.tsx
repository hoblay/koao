import Avatar from "@/app/components/Avatar/Avatar";
import Tag from "@/app/components/Tag/Tag";
import { authOptions } from "@/server/auth";
import { IconPhotoPlus, IconUserEdit } from "@tabler/icons-react";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="relative p-4">
      <div className="flex flex-col min-w-[1084px] gap-4 items-start rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex w-full items-center justify-between px-4 py-4 border-b border-[#1f1f1f]/10 dark:border-[#363636]">
          <h2 className=" text-[17px] font-semibold items-center ">
            Meu perfil
          </h2>
          <Tag
            name="Editar dados"
            startContent={<IconUserEdit className="size-5" />}
          />
        </div>
        <div className="flex gap-4  px-4 pb-4">
          <div className="flex relative">
            <Avatar
              name={session?.user.name}
              image={session?.user.image}
              size="xl"
              color={session?.user.color}
            />
            <div className="absolute top-1  right-1 flex  rounded-full p-2 text-white bg-[#363636]">
              <IconPhotoPlus className="size-6" />
            </div>
          </div>

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
    </div>
  );
}
