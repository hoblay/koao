"use client"

import { IconWorld, IconBooks, IconPresentation, IconDesk, IconChalkboard, IconMicroscope } from '@tabler/icons-react'
import React from 'react'
import { SideBar } from './SideBar'

function Aside() {
  return (
    <aside className="sticky mt-5 top-5 left-5 h-[100%] md:flex overscroll-y-none overscroll-x-none ">
      <SideBar.Root logo brand="Logotipo" className=""> 
        <SideBar.Section first>
          <SideBar.Item title="Explorar" icon={IconWorld} href="/"/>
          <SideBar.Item title="Cursos" icon={IconBooks} />
          <SideBar.Item title="Aulas" icon={IconPresentation}/>
        </SideBar.Section>
        <SideBar.Section title="Escritorio">
          <SideBar.Item title="Meus arquivos" icon={IconDesk} parent>
              <SideBar.Item title="Teste" href="/teste"/>
              <SideBar.Item title="Element" />
              <SideBar.Item title="Element"/>
          </SideBar.Item>

          <SideBar.Item title="Quadro" icon={IconChalkboard}/>
          <SideBar.Item title="Materia" icon={IconMicroscope}/>
        </SideBar.Section>
      </SideBar.Root>
      </aside>
  )
}

export default Aside