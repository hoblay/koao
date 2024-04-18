import Link from "next/link";
import { redirect } from "next/navigation";
import { Search } from "@/app/components/Search/Index";
import UserAvatar from "@/app/components/UserAvatar";
import LogoIcon from "../components/Icons/Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export default async function ClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  return (
    <div className="relative flex ">
      <main className="">
        <nav className=" dark:bg-[#101012] w-full z-20  bg-white">
          <div className="relative flex pr-10 pl-10 gap-48 pt-4 py-2  items-center ">
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
            <div className="flex justify-between items-center w-full pl-6">
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
    </div>
  );
}
