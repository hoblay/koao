"use client";

import { SessionProvider as SP, SessionProviderProps } from "next-auth/react";

import React from 'react'

function SessionProvider({children, session}: SessionProviderProps
  ) {
  return (
    <SP session={session}>{children}</SP>
  )
}

export default SessionProvider