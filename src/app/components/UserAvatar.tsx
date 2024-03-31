import { IconLayoutDashboard, IconSettings, IconMoneybag, IconMoonStars, IconLogout, IconSun } from '@tabler/icons-react'
import React from 'react'
import { Dropdown } from './Dropdown'
import Avatar from '@/app/components/Avatar/Prova'
 
interface UserAvatarProps{
  theme?: string | undefined,
  setTheme: Function
}

 function UserAvatar({theme, setTheme}: UserAvatarProps) {
    
  return (
    <div className="items-center my-auto ml-auto relative space-x-4 " >
        <Dropdown.Root>
          <Dropdown.Trigger>
            <Avatar/>
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
