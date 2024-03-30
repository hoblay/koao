"use client";

import LoginForm from "@/app/components/auth/LoginForm";
import { SignInSchema, TSignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {Form } from "@/app/components/Form"
import { useState } from "react";
import CardWrapper from "@/app/components/auth/CardWrapper";






export default function SignIn() {

const signInForm = useForm<TSignInSchema>({
  resolver: zodResolver(SignInSchema)
});
const {formState: { isSubmitting}, handleSubmit, reset} = signInForm;

 
const logInUser = (data:TSignInSchema) => {
  reset();
}

  return (
    <CardWrapper
    headerLabel='Accesse a sua conta '
    backButonLabel="Ainda não tens uma conta?"
    backButtonHref='/signup'
    showSocial
  >
      <FormProvider {...signInForm}>
        <form onSubmit={handleSubmit( data => logInUser(data))} className="flex flex-col gap-6 w-full max-w-xs">
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input type="email" name="email"/>
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input type="password" name="password"/>
            <Form.ErrorMessage field="password"/>
          </Form.Field>
         <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
          >
            Acessar
          </button> 
        </form>
      </FormProvider>
     
    </CardWrapper>
  );
}


