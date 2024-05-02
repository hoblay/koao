"use client";
import {
  IconLockPin,
  IconNotification,
  IconReportMoney,
  IconShieldLock,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";

export function SettingsSidebar() {
  return (
    <aside className="flex flex-col gap-2 min-w-[256px]  fixed  top-[78px] border-t border-r border-b border-[#1f1f1f]/10 dark:border-[#363636] min-h-[calc(100vh-78px)]">
      <header className="w-full bg-white dark:bg-[#2d2d2d] py-3.5 px-4  border-r border-b border-[#1f1f1f]/10 dark:border-[#363636]">
        <div className="flex justify-between  ">
          Definições
          <div className="flex"></div>
        </div>
      </header>
      <nav className="flex flex-col px-2 py-1 gap-2">
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href={"/dashboard/settings/account"}
              className={`flex gap-2 w-full items-center justify-between p-3 text-zinc-600 rounded-md dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#363636] group transition-all duration-75 ease-in-out `}
            >
              <IconUser
                className={` flex-shrink-0 size-5  transition duration-75  text-zinc-500  group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white`}
              />
              <span
                className={`flex-1 text-left rtl:text-right text-sm whitespace-nowrap `}
              >
                Minha conta
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/settings/security"}
              className={`flex gap-2 w-full items-center justify-between p-3 text-zinc-600 rounded-md dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#363636] group transition-all duration-75 ease-in-out `}
            >
              <IconLockPin
                className={` flex-shrink-0 size-5  transition duration-75  text-zinc-500  group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white`}
              />
              <span
                className={`flex-1 text-left rtl:text-right text-sm whitespace-nowrap `}
              >
                Segurança
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/settings/privacy"}
              className={`flex gap-2 w-full items-center justify-between p-3 text-zinc-600 rounded-md dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#363636] group transition-all duration-75 ease-in-out `}
            >
              <IconShieldLock
                className={` flex-shrink-0 size-5  transition duration-75  text-zinc-500  group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white`}
              />
              <span
                className={`flex-1 text-left rtl:text-right text-sm whitespace-nowrap `}
              >
                Privacidade
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/settings/notifications"}
              className={`flex gap-2 w-full items-center justify-between p-3 text-zinc-600 rounded-md dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#363636] group transition-all duration-75 ease-in-out `}
            >
              <IconNotification
                className={` flex-shrink-0 size-5  transition duration-75  text-zinc-500  group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white`}
              />
              <span
                className={`flex-1 text-left rtl:text-right text-sm whitespace-nowrap `}
              >
                Notificações
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/settings/payments"}
              className={`flex gap-2 w-full items-center justify-between p-3 text-zinc-600 rounded-md dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#363636] group transition-all duration-75 ease-in-out `}
            >
              <IconReportMoney
                className={` flex-shrink-0 size-5  transition duration-75  text-zinc-500  group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white`}
              />
              <span
                className={`flex-1 text-left rtl:text-right text-sm whitespace-nowrap `}
              >
                Pagamentos
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
