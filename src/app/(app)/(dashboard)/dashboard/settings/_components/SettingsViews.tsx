"use client";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Tag from "@/app/components/Tag/Tag";

import {
  IconError404,
  IconStatusChange,
  IconUserEdit,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function SettingsViews({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col pl-[256px]">
      <header
        className={`p-4 w-full max-w-[1116px]  fixed z-10 top-[78px] bg-white dark:bg-[#2d2d2d] border-t   border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]`}
      >
        <div className="flex justify-between  ">
          <Breadcrumb.RootA>
            <Breadcrumb.Item
              first
              href="/dashboard"
              title="Painel de controle"
            />
            <Breadcrumb.Item
              href="/dashboard/settings/account"
              title="Definições"
            />
            {pathname === "/dashboard/settings/account" && (
              <Breadcrumb.Item href="/settings/account" title="Minha conta" />
            )}
            {pathname === "/dashboard/settings/security" && (
              <Breadcrumb.Item
                href="/dashboard/settings/security"
                title="Segurança"
              />
            )}
            {pathname === "/dashboard/settings/privacy" && (
              <Breadcrumb.Item
                href="/dashboard/settings/privacy"
                title="Privacidade"
              />
            )}
            {pathname === "/dashboard/settings/notifications" && (
              <Breadcrumb.Item
                href="/dashboard/settings/notifications"
                title="Notificações"
              />
            )}
            {pathname === "/dashboard/settings/payments" && (
              <Breadcrumb.Item
                href="/dashboard/settings/payments"
                title="Pagamentos"
              />
            )}
          </Breadcrumb.RootA>
          <div className="flex"></div>
        </div>
      </header>

      <div className="relative rounded-lg pt-[52px] w-full items-center justify-center text-center ">
        {children}
      </div>
    </div>
  );
}
