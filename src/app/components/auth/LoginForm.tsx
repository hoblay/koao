"use client";

import * as z from "zod";

import React from 'react'
import CardWrapper from './CardWrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from "@/schemas";


function LoginForm() {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  return (
    <CardWrapper
      headerLabel='Welcome back '
      backButonLabel="Don't have an Account?"
      backButtonHref='/auth/register'
      showSocial
    >
      LoginForm
    </CardWrapper>
  )
}

export default LoginForm