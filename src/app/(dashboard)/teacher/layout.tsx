import { Search } from "@/app/components/Search/Index";
import UserAvatar from "@/app/components/UserAvatar";
import { getServerSession } from "next-auth";
import Aside from "@/app/components/Aside";
import LogoIcon from "@/app/components/Icons/Logo";
import Link from "next/link";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getServerSession()

  return (
    <div className="relative flex" >
      <main className="w-full">
        <div className="flex px-9 py-3  items-center justify-between">
          <Link href={"/"} className="flex p-2 space-x-2 items-center">
            <div className=""><LogoIcon width="40" height="28" className="#015F43"/> </div>
            <span className={`p-1 text-lg font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap transition-[opacity] duration-75 ease-in `}>
              Logotipo
            </span>
          </Link>
          <UserAvatar user={session?.user}/>

        </div>
        {children}
      </main>
    </div>
  )}
