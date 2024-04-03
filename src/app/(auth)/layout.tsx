"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoIcon from "../components/Icons/Logo";


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {

const router = useRouter()
const { data: session } = useSession() 
if(session) router.push('/')
  return (
    <div className="relative flex justify-between">
     
      <main className="bg-zinc-50 dark:bg-zinc-900 w-full items-center justify-center pl-28 py-10 h-[100vh] max-h-[100vh]">
        <Link href={"/"} className="flex gap-2 items-center mb-8"><LogoIcon width='45' height='33' className="#015F43"/> 
          <span className={` text-xl font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap`}>
            Logotipo
          </span>
        </Link>
        {children}
      </main>
      <div className="bg-[#697e78] dark:bg-[#152521] w-full max-w-[736px] min-h-[100%] hidden md:block"></div>
    </div>
  )}