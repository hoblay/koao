import React, { ReactNode } from 'react'
import { Card } from '../Card'
import { IconBrandGithubFilled, IconBrandGoogleFilled } from '@tabler/icons-react'
import Link from 'next/link'

interface CardWrapperProps{
  children?: ReactNode | ReactNode[],
  headerLabel?: string,
  backButonLabel?: string,
  backButtonHref: string,
  showSocial?: boolean,
}

function CardWrapper({children, headerLabel, backButonLabel, backButtonHref, showSocial}:CardWrapperProps) {
  return (
    <Card.Root className="m-auto max-w-96">
      <Card.Header showDivider className='p-4 text-center'>{headerLabel}</Card.Header>
      <Card.Body  className='p-10'>
        {children}
      </Card.Body>
      <Card.Footer className=''>
        <div className="items-center justify-center px-5 flex gap-4">
          <button className="py-3 px-12 w-full items-center justify-center bg-purple-500 hover:bg-purple-600 text-zinc-100 flex rounded-xl">
            <IconBrandGoogleFilled />
          </button>
          <button className="py-3 px-12 w-full items-center justify-center bg-purple-500 hover:bg-purple-600 text-zinc-100 flex rounded-xl">
            <IconBrandGithubFilled />
          </button>
        </div>
        <div className="items-center justify-center text-center p-4">
          <button>
            <Link href={backButtonHref}>{backButonLabel}</Link>
          </button>
        </div>
      </Card.Footer>
    </Card.Root>
  )
}

export default CardWrapper