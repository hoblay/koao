"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


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
        {children}
      </main>
      <div className="bg-purple-600 w-full max-w-[736px] min-h-[100%] hidden md:block"></div>
    </div>
  )}