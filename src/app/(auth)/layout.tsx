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
    <div className="relative flex flex-col justify-center items-center min-h-[100%] py-32">
      <Link href={"/"} className="flex gap-2 items-center py-3">
        <LogoIcon width="38" height="26" className="#015F43" />
        <span
          className={` text-xl font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap`}
        >
          Logotipo
        </span>
      </Link>
      <main className="flex  items-center justify-center  ">{children}</main>
    </div>
  );
}
