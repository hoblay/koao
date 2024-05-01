"use client";
import { trpc } from "@/app/_trpc/client";
import {
  IconDots,
  IconChevronRight,
  IconAwardFilled,
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
    <li className="inline-flex items-center gap-1">
      {!first && <IconChevronRight className="w-4 h-4 mt-[3px]" />}
      <Link href={`${href || "#"}`}>
        <span className="font-normal text-sm dark:hover:text-zinc-200">
          {title}
        </span>
      </Link>
    </li>
  );
}

export default BreadcrumbItem;
