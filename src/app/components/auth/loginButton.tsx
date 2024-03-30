"use client";
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation';

interface LoginButtonProps{
  children?: ReactNode | ReactNode[],
  mode?: 'modal'| 'redirect',
  asChild?: boolean
}



function LoginButton({children, mode = 'redirect', asChild}:LoginButtonProps) {
  const router  = useRouter();
  const onClick = () => {
    router.push("/auth/login")
  }

  return (
    <span onClick={onClick} className='cursor pointer'>{children}</span>
  )
}

export default LoginButton;