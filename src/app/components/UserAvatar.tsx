"use client";
import { IconLayoutDashboard, IconSettings, IconMoneybag, IconMoonStars, IconLogout, IconSun, IconLogin } from '@tabler/icons-react'
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
  plan?: string
}
 function UserAvatar({user}: UserAvatarProps) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [themeState, setThemeState] = useState<string | undefined>('system');   

  const {data: session} = useSession()
  if(session)user = session.user;
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
          <Avatar initials={`${user ? firstName[0]+''+lastName[0] : 'sebago'}`} image={user?.image}/>
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
