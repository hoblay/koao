import { Search } from "@/app/components/Search/Index";
import UserAvatar from "@/app/components/UserAvatar";
import { getServerSession } from "next-auth";
import Aside from "@/app/components/Aside";
import LogoIcon from "@/app/components/Icons/Logo";
import Link from "next/link";
import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconBook2, IconBooks, IconCloudUpload, IconSettings, IconTags, IconTimeline } from "@tabler/icons-react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  


  return (
    <div className=" flex flex-col" >
      <nav className="md:px-24 px-4 pb-4 w-full">
        <div className="flex gap-3">
          <Link href="/teacher/category">
            <Tag  name="Categorias" startContent={<IconTags className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
          <Link href="/teacher/upload">
            <Tag  name="Definições" startContent={<IconSettings className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
          <Link href="/teacher/create">
            <Tag  name="Rendimento" startContent={<IconTimeline className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
          </Link>
        </div>
        
      </nav>
      <main className="w-full  ">
        {children} 
      </main>
    </div>
  )}
