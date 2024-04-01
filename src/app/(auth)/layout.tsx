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
    <div className="relative flex">
     
      <main className="w-full my-20">
        {children}
      </main>
    </div>
  )}