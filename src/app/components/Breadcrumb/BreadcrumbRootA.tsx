"use client";
import { trpc } from "@/app/_trpc/client";
import {
  IconDots,
  IconChevronRight,
  IconAwardFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { ReactNode } from "react";

function BreadcrumbRootA({ children }: { children?: ReactNode | ReactNode[] }) {
  return (
    <ol className="flex flex-wrap gap-1 items-center break-words text-sm text-muted-foreground">
      {children}
    </ol>
  );
}

export default BreadcrumbRootA;
