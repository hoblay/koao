"use client";
import React, { SyntheticEvent, useState } from 'react'

import { formatBytes } from "@/utils/format-bytes";
import { formatSecondsToMinutes } from "@/utils/format-seconds";
import Tag from '@/app/components/Tag/Tag';
import { IconTag, IconDots, IconTrash, IconEdit } from '@tabler/icons-react';
import { Dropdown } from '@/app/components/Dropdown';

interface Aula {
  name: string,
  src: string,
  size: number,
  type: string,
  duration: string
}


function TableRow({file, onClick}: {file:Aula, onClick: any}) {

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');



  const updateDuration = (duration:number) => {
    
    setDuration(formatSecondsToMinutes(duration))

  }
  const updateName = (name:string) => {

  }


  function handleLoadedMetadata(
    event: SyntheticEvent<HTMLVideoElement>
  ) {
    updateDuration(event.currentTarget.duration)
    setName(file.name)
  }
  return (
    <tr className="bg-zinc-50 border-b dark:bg-zinc-950 dark:border-zinc-900 py-2 " key={file.name}>
      <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
        <div className="flex gap-4">
          <video src={file?.src } controls={false}
        className="pointer-events-none aspect-video rounded-md"
        preload="metadata"
        onLoadedMetadata={(event) =>
          handleLoadedMetadata(event)
        } width={133} height={84} typeof={file.type}   style={{objectFit: 'cover'}}/>
          <div className="flex flex-col gap-2 w-full">
            <input className="max-h-10 text-xs w-full p-3 rounded-lg focus:ring-0 outline-none bg-zinc-100 hover:bg-white focus:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/30 dark:focus:bg-zinc-800/30" type="text" name="title" value={name} placeholder="Titulo da aula" onChange={e => setName( e.target.value)}/>
            <div className="flex">
              <Tag  name="Categoria" className="border border-zinc-800 border-dashed dark:bg-zinc-950 text-xs items-center justify-center" startContent={<IconTag className="w-5 h-5 text-zinc-500 dark:text-zinc-400"/>}/>
            </div>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">
        {duration}
      </td>
      <td className="px-6 py-4">
        {formatBytes(file.size)}
      </td>
      <td className="px-6 py-4">
        <div className="flex">
          <Tag  name="Pronto " />
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button className="p-2 border-zinc-800 border rounded-xl hover:bg-zinc-800/10"><IconDots /></button>
          </Dropdown.Trigger>
          <Dropdown.Menu className='right-12'>
            <Dropdown.Section>
              <Dropdown.Item title="Editar a aula" description={"Aperte para editar"} startContent={<IconEdit className="text-zinc-600"/>} onClick={() => onClick(file.name)}/>
              <Dropdown.Item title="Eliminar a aula" description={"Aperte para eliminar"} startContent={<IconTrash className="text-red-500"/>} onClick={() => onClick(file.name)}/>
            </Dropdown.Section> 
          </Dropdown.Menu>
        </Dropdown.Root>
      </td> 
  </tr>
  )
}

export default TableRow