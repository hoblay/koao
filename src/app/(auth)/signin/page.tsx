"use client";

import LoginForm from "@/app/components/auth/LoginForm";
import { SignInSchema, TSignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {Form } from "@/app/components/Form"
import { useState } from "react";
import CardWrapper from "@/app/components/auth/CardWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconLoader3 } from "@tabler/icons-react";






export default function SignIn() {
  const router = useRouter();

const signInForm = useForm<TSignInSchema>({
  resolver: zodResolver(SignInSchema)
});
const {formState: { isSubmitting}, handleSubmit, reset} = signInForm;

 
const logInUser = async (data:TSignInSchema) => {
  const signInData = await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false
  })

  if (signInData?.error) console.error(signInData.error)
  else {
    reset();
    router.refresh();
    router.push('/');
  }
}

  return (
    <CardWrapper
    headerLabel='Acesse a plataforma'
    backButonLabel="Ainda não tem uma conta? Inscreva-se"
    backButtonHref='/signup'
    showSocial
  >
      <FormProvider {...signInForm}>
        <form onSubmit={handleSubmit( data => logInUser(data))} className="flex flex-col gap-[22px] w-full">
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input type="email" name="email" placeholder="exemplo@email.com"/>
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input type="password" name="password" placeholder="palavra-passe"/>
            <Form.ErrorMessage field="password"/>
          </Form.Field>
         <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#015F43] mt-3 text-white rounded px-3 h-[53px] font-semibold text-sm hover:bg-[#224138] flex justify-center items-center disabled:bg-[#172d26]"
          >
            {isSubmitting 
            ? <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-[#015F43] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#015F43] animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#015F43] animate-bounce [animation-delay:-.5s]"></div>
              </div>
            : <span className="text-base">Acessar</span> }
          </button> 
        </form>
      </FormProvider>
     
    </CardWrapper>
  );
}


