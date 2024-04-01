import { Search } from "../components/Search/Index";
import UserAvatar from "../components/UserAvatar";
import { getServerSession } from "next-auth";
import Aside from "../components/Aside";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getServerSession()

  return (
    <div className="relative flex" >
      <Aside/>
      <main className="w-full">
        <div className="flex px-9 pt-5 pb-4">
          <Search.Root className="w-[100%]">
            <Search.Section title="Colegas">
              <Search.Result type="user" user={{name: "Winslet Mateus", email: "winsletmateus@gmail.com"}}/>
              <Search.Result type="user" user={{name: "João Francisco", email: "jfrancisco@gmail.com"}}/>
            </Search.Section>
            <Search.Section title="Materia">
              <Search.Result type="file" name="Algebra_linear.pdf"/>
              <Search.Result type="file" name="Calculo-01.pdf"/>
              <Search.Result type="file" name="Introdução_EngInf.pdf"/>
            </Search.Section>
          </Search.Root>

          <UserAvatar user={session?.user}/>

        </div>
        {children}
      </main>
    </div>
  )}
