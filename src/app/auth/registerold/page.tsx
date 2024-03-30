"use client";

import { RegisterSchema, RegisterSchemaType, mappedPlans } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";





export default function Register() {
  const [output , setOutput] = useState('')
  const {register, handleSubmit,watch, formState: {errors, isSubmitting}, reset} = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema)
  })


  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>{value} </option>
  ))

  const createUser = (data:RegisterSchemaType) => {
    setOutput(JSON.stringify(data, null, 2));
    reset()
  }

  return (
    <div className="p-20">
      <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="name">Nome</label>
          <input type="text" {...register('name')} id="" />
          {errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
        </div> 
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} id="" />
          {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
        </div> 
        <div className="flex flex-col">
          <label htmlFor="password">Palavra-passe</label>
          <input type="password" {...register('password')} id="" />
          {errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
        </div> 
        <div className="flex flex-col">
          <label htmlFor="confirmPasword">Confrima a palavra-passe</label>
          <input type="password" {...register('confirmPassword')} id="" />
          {errors.confirmPassword?.message && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
        </div> 
        <div className="flex flex-col">
          <label htmlFor="dateOfBirth">Data de nascimento</label>
          <input type="date" {...register('dateOfBirth')} id="" />
          {errors.dateOfBirth?.message && <p className="text-red-500">{errors.dateOfBirth?.message}</p>}
        </div> 
        <div className="flex flex-col">
          <label htmlFor="plan">Plano</label>
          <select {...register('plan')} id="">
            {plansOptions} 
          </select>
          {errors.plan?.message && <p className="text-red-500">{errors.plan?.message}</p>}
        </div>
        <input type="submit" value="cadastrar" disabled={isSubmitting} className="p-4 bg-purple-600 text-white disabled:bg-zinc-700" /> 
      </form>
      <pre className="p-10">{output}</pre>
    </div>
  );
}


