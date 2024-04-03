import React, { ReactNode } from 'react'
import { Card } from '../Card'
import { IconBrandGithubFilled, IconBrandGoogleFilled } from '@tabler/icons-react'
import Link from 'next/link'
import LogoIcon from '../Icons/Logo'

interface CardWrapperProps{
  children?: ReactNode | ReactNode[],
  headerLabel?: string,
  backButonLabel?: string,
  backButtonHref: string,
  showSocial?: boolean,
}

function CardWrapper({children, headerLabel, backButonLabel, backButtonHref, showSocial}:CardWrapperProps) {
  return (
    <Card.Root className="max-w-[385px]">
      <Card.Header className='flex flex-col gap-4 py-3'>
      
        <h1 className='text-3xl font-semibold'>{headerLabel}</h1>
        <p>Faça login ou registre-se para começar a aprender ainda hoje.</p>
      </Card.Header>
      <Card.Body  className=' py-4'>
        {children}
      </Card.Body>
      <Card.Footer className=''>

        
        <div className="items-center justify-between mt-8 flex">

        <div className="px-6">
        <span className='flex text-center  '>Ou se preferir</span>
        </div>
          <button className="py-3 w-[60%] items-center justify-center bg-zinc-700 hover:bg-zinc-800 text-zinc-100 flex rounded-md">
            <IconBrandGoogleFilled />
          </button>

        </div>
        <div className=" mt-10">
          
          <button>
            <Link href={backButtonHref}>{backButonLabel}</Link>
          </button>
        </div>
      </Card.Footer>
    </Card.Root>
  )
}

export default CardWrapper