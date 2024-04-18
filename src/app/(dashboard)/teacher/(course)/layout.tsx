import { Search } from "@/app/components/Search/Index";
import UserAvatar from "@/app/components/UserAvatar";
import { getServerSession } from "next-auth";
import Aside from "@/app/components/Aside";
import LogoIcon from "@/app/components/Icons/Logo";
import Link from "next/link";
import Tag from "@/app/components/Tag/Tag";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  IconBook2,
  IconBooks,
  IconCloudUpload,
  IconLayoutDashboard,
  IconSettings,
  IconTags,
  IconTimeline,
} from "@tabler/icons-react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col">
      <main className="w-full  ">{children}</main>
    </div>
  );
}
