"use client";

import { RegisterSchema, RegisterSchemaType, mappedPlans } from "@/schemas";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {  FormProvider, useForm } from "react-hook-form";

import {Form} from '@/app/components/Form'





export default function Register() {
  const [output , setOutput] = useState('')

  const registerForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })
  const {register, handleSubmit,watch, formState: {errors, isSubmitting}, reset} = registerForm; 

  const userPassword = watch('password')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])').test(userPassword)


  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>{value} </option>
  ))

  const registerUser = (data:RegisterSchemaType) => {
    setOutput(JSON.stringify(data, null, 2));
    reset()
  }

  return (
    <div className="p-20">
      <FormProvider {...registerForm}>
        <form 
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col gap-6 w-full max-w-xs"
        >
          <Form.Field>
            <Form.Label htmlFor="name">
              Nome
            </Form.Label>
            <Form.Input type="text" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">
              E-mail
            </Form.Label>
            <Form.Input type="email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">
              Palavra-passe

              {userPassword && (isPasswordStrong 
                ? <span className="text-xs text-emerald-600">Senha forte</span>
                : <span className="text-xs text-red-500">Senha fraca</span>)}
            </Form.Label>
            <Form.Input type="password" name="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="confirmPasword">
              Confirme a palavra-passe
            </Form.Label>
            <Form.Input type="password" name="confirmPassword" />
            <Form.ErrorMessage field="confirmPassword" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="dateOfBirth">
              Data de nascimento
            </Form.Label>
            <Form.Input type="date" name="dateOfBirth" />
            <Form.ErrorMessage field="dateOfBirth" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="plan">
              plan
            </Form.Label>
            <Form.Input type="select" name="plan"> 
              {plansOptions}  
            </Form.Input>
            <Form.ErrorMessage field="plan" />
          </Form.Field>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
          >
            Salvar
          </button>
        </form>
      </FormProvider>
         

         

         


         
      <pre className="p-10">{output}</pre>
    </div>
  );
}


