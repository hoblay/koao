import { IconLayoutDashboard, IconSettings, IconMoneybag, IconMoonStars, IconLogout, IconSun, IconLogin } from '@tabler/icons-react'
import React from 'react'
import { Dropdown } from './Dropdown'
import Avatar from '@/app/components/Avatar/Prova'
import { signOut, useSession } from 'next-auth/react'
 
interface UserAvatarProps{
  theme?: string | undefined,
  setTheme: Function
}

 function UserAvatar({theme, setTheme}: UserAvatarProps) {
   const { data: session } = useSession()
   let firstName = ' ';
   let lastName = ' '  ;
   console.log(session)
   
  if( session?.user.name){
    const name = session.user.name.split(' ')
     firstName = name[0]
     lastName = name[name.length - 1]
  } 
  return (
    <div className="items-center my-auto ml-auto relative space-x-4 " >
        <Dropdown.Root>
          <Dropdown.Trigger>
            <Avatar initials={`${firstName[0]}${lastName[0]}`} image={session?.user?.image}/>
         </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Section>
                { session?.user ? <Dropdown.Item title={session?.user.name } description={session?.user.email} /> 
                : <Dropdown.Item title={'Iniciar sessão' } description={'Criar uma conta'} startContent={ <IconLogin  className="w-4 h-4"/>} href='/signin'/>}
              {session?.user && 
                <>
                  <Dropdown.Item title={"Painel de control"} startContent={ <IconLayoutDashboard className="w-4 h-4"/>}/>
              
              <Dropdown.Item title={"Ganhos"} startContent={<IconMoneybag className="w-4 h-4"/>}/>
                
                </>
              
              }
              <Dropdown.Item title={"Definições"} description="Configurações" startContent={<IconSettings  className="w-4 h-4"/>}/>
              <Dropdown.Item title={`${theme === 'dark' ? 'Modo escuro' : 'Modo claro' }`} shortcut description="Trocar o tema" startContent={theme === 'dark' ?<IconMoonStars className="w-4 h-4"/> : <IconSun className="w-4 h-4" />} onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")} />
            </Dropdown.Section>
            { session?.user && 
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
