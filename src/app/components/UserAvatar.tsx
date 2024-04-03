"use client";
import { IconLayoutDashboard, IconSettings, IconMoneybag, IconMoonStars, IconLogout, IconSun, IconLogin, IconChevronDown } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { Dropdown } from './Dropdown'
import Avatar from '@/app/components/Avatar/Avatar'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
 
interface UserAvatarProps{
  user?: User
}
interface User{
  id: string,
  name: string,
  email: string,
  image?: string,
  plan?: string,
  color?: "purple" | "green" | "emerald" | "orange" | "pink" | "blue" | "amber"
}
 function UserAvatar({user}: UserAvatarProps) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [themeState, setThemeState] = useState<string | undefined>('system');   

  const {data: session} = useSession()
  if(session) user = session.user;
  let firstName = ' ';
  let lastName = ' '  ;

  if(user?.name){
    const name = user.name.split(' ')
    firstName = name[0]
    lastName = name[name.length - 1]
  } 

  useEffect(() => {
    setThemeState(theme)
  },[theme])
  return (
    <div className="items-center my-auto ml-auto relative space-x-4 " >
      <Dropdown.Root>
        <Dropdown.Trigger>
        <div className={`flex gap-3 rounded-xl hover:bg-zinc-50/70 dark:hover:bg-zinc-900/70 py-2 pr-2 cursor-pointer max-w-[212px]${user?.name ? 'pl-4 ' : 'pl-2'}`}>
        <div className="w-full flex-1 flex flex-col items-end justify-center overflow-x-hidden text-end py-1">
          <span className="w-full flex-1 text-sm truncate text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-50">{user?.name}</span>
          <span className="w-full text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-100 truncate">{user?.email}</span>
        </div>
          <div className="min-h-[44px] min-w-[44px]"><Avatar initials={`${user ? firstName[0]+''+lastName[0] : 'sebago'}`} image={user?.image} color={user?.color}/></div>
          
        </div>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Section>
            { user ? 
             <>
              <Dropdown.Item title={user.name } description={user.email} /> 
              <Dropdown.Item title={"Painel de control"} startContent={ <IconLayoutDashboard className="w-4 h-4"/>}/>
              <Dropdown.Item title={"Ganhos"} startContent={<IconMoneybag className="w-4 h-4"/>}/>
            </>
            : <Dropdown.Item title={'Iniciar sessão' } description={'Criar uma conta'} startContent={ <IconLogin  className="w-4 h-4"/>} href='/signin'/>
              }
            <Dropdown.Item title={"Definições"} description="Configurações" startContent={<IconSettings  className="w-4 h-4"/>}/>
            <Dropdown.Item title={`${themeState === 'dark' ? 'Modo escuro' : 'Modo claro' }`} shortcut description="Trocar o tema" startContent={themeState === 'dark' ?<IconMoonStars className="w-4 h-4"/> : <IconSun className="w-4 h-4" />} onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")} />
          </Dropdown.Section>
          {user && 
            <Dropdown.Section showDivider>
              <Dropdown.Item title="Sair" description="Encerrar sessão" startContent={ <IconLogout  className="w-4 h-4"/>} onClick={() => signOut({redirect: true, callbackUrl: '/'})}/>
            </Dropdown.Section>
          }
          
        </Dropdown.Menu> 
      </Dropdown.Root>
    </div>
  )
}

export default UserAvatar
