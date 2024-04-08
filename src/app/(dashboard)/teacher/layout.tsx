
import UserAvatar from "@/app/components/UserAvatar";
import { getServerSession } from "next-auth";
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
      <main className="w-full flex flex-col mt-24">
        <nav className=" dark:bg-[#101012] fixed w-full z-20 top-0 start-0 bg-white">
        <div className="relative flex px-[90px] pt-4 py-4  items-center justify-between">
          <Link href={"/"} className="flex p-2 space-x-2 items-center">
            <div className=""><LogoIcon width="40" height="28" className="#015F43"/> </div>
            <span className={`p-1 text-lg font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap transition-[opacity] duration-75 ease-in `}>
              Logotipo
            </span>
          </Link>
          <UserAvatar user={session?.user}/>

        </div>
        </nav>
        {children}
      </main>
    </div>
  )}
