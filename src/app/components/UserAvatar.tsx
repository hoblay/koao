import { IconLayoutDashboard, IconSettings, IconMoneybag, IconMoonStars, IconLogout, IconSun } from '@tabler/icons-react'
import React from 'react'
import { Dropdown } from './Dropdown'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

interface UserAvatarProps{
  theme?: string | undefined,
  setTheme: Function
}


async function UserAvatar({theme, setTheme}: UserAvatarProps) {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <div className="items-center my-auto ml-auto relative space-x-4 " >
        <Dropdown.Root>
          <Dropdown.Trigger>
            <span className="inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500 select-none cursor-pointer" >
              WM
            </span>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Section>
              <Dropdown.Item title={"Winslet Mateus"} description="hoblayrecords@gmail.com"/>
              <Dropdown.Item title={"Painel de control"} startContent={ <IconLayoutDashboard className="w-4 h-4"/>}/>
              <Dropdown.Item title={"Definições"} startContent={<IconSettings  className="w-4 h-4"/>}/>
              <Dropdown.Item title={"Ganhos"} startContent={<IconMoneybag className="w-4 h-4"/>}/>
              <Dropdown.Item title={`${theme === 'dark' ? 'Modo escuro' : 'Modo claro' }`} shortcut description="Trocar o tema" startContent={theme === 'dark' ?<IconMoonStars className="w-4 h-4"/> : <IconSun className="w-4 h-4" />} onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")} />
            </Dropdown.Section>
            <Dropdown.Section showDivider>
              
              <Dropdown.Item title="Sair" description="Encerrar sessão" startContent={ <IconLogout  className="w-4 h-4"/>}/>
            </Dropdown.Section>
          </Dropdown.Menu> 
        </Dropdown.Root>
      </div>
  )
}

export default UserAvatar