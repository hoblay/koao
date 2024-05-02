"use client";
import { trpc } from "@/app/_trpc/client";
import {
  IconDots,
  IconChevronRight,
  IconAwardFilled,
  IconSlash,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { ReactNode } from "react";

function BreadcrumbItem({
  title,
  first,
  href,
}: {
  title: string;
  href?: string;
  first?: boolean;
}) {
  return (
    <li className="inline-flex items-center gap-0.5">
      {!first && (
        <IconSlash className="size-5 -rotate-12 text-[#1f1f1f]/10 dark:text-[#363636]" />
      )}
      <Link href={`${href || "#"}`}>
        <span className="font-normal text-sm dark:hover:text-zinc-200 dark:text-zinc-400">
          {title}
        </span>
      </Link>
    </li>
  );
}

export default BreadcrumbItem;
