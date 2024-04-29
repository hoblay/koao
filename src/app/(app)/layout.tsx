import { Search } from "../components/Search/Index";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoIcon from "../components/Icons/Logo";
import SignDialog from "./_components/SignDialog";
import { authOptions } from "@/server/auth";
import UserAvatar from "./_components/UserAvatar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex">
      <main className={`w-full ${!session?.user && "pb-[84px]"}`}>
        <nav className=" dark:bg-[#2d2d2d] w-full z-20  bg-white fixed">
          <div className="relative flex pr-10 pl-10 gap-48 py-2  items-center justify-between">
            <div className="flex">
              <Link href={"/"} className="flex p-2 space-x-2 items-center">
                <div className="">
                  <LogoIcon width="40" height="28" className="#015F43" />{" "}
                </div>
                <span
                  className={`p-1 text-lg font-semibold text-zinc-700 dark:text-zinc-50 whitespace-nowrap transition-[opacity] duration-75 ease-in `}
                >
                  Logotipo
                </span>
              </Link>
            </div>
            <div className="flex justify-between items-center w-full pl-[53px]">
              <Search.Root className="w-[100%]">
                <Search.Section title="Colegas">
                  <Search.Result
                    type="user"
                    user={{
                      name: "Winslet Mateus",
                      email: "winsletmateus@gmail.com",
                    }}
                  />
                  <Search.Result
                    type="user"
                    user={{
                      name: "João Francisco",
                      email: "jfrancisco@gmail.com",
                    }}
                  />
                </Search.Section>
                <Search.Section title="Materia">
                  <Search.Result type="file" name="Algebra_linear.pdf" />
                  <Search.Result type="file" name="Calculo-01.pdf" />
                  <Search.Result type="file" name="Introdução_EngInf.pdf" />
                </Search.Section>
              </Search.Root>
              <UserAvatar user={session?.user} />
            </div>
          </div>
        </nav>
        {children}
      </main>
      <SignDialog />
    </div>
  );
}
