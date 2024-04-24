"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoIcon from "../components/Icons/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) router.push("/");
  return (
    <div className="relative flex justify-center items-center">
      <main className="flex  items-center justify-center min-h-[100%] py-32">
        {children}
      </main>
    </div>
  );
}
