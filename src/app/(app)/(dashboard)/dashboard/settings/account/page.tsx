import Avatar from "@/app/components/Avatar/Avatar";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="relative p-4">
      <div className="flex min-w-[1084px] gap-4 p-4 items-center rounded-lg w-full dark:bg-[#1f1f1f]/20 border border-[#1f1f1f]/10 dark:border-[#363636]">
        <Avatar
          name={session?.user.name}
          image={session?.user.image}
          size="xl"
          color={session?.user.color}
        />
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
              {session?.user.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
