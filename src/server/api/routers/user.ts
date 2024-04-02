import { SignUpSchema, TSignUpSchema } from "@/schemas"
import { publicProcedure, router } from "@/server/api/trpc"
import { db } from "@/server/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import {plans} from "@/schemas"

export const RSignUpSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome tem que ser maior a 3 carateres.'
  }).max(200, {
    message: 'O nome tem que ser menor a 200 carateres.'
  }).transform(name => {  
    return name.trim().split(' ').map(word => {
     return word[0].toLocaleUpperCase().concat(word.substring(1))
  }).join(' ')}),
  email: z.string().email({
    message: 'Por favor insira um email valido.'
  }).transform(email => { return email.toLowerCase()}),
  password: z.string().min(6, {
    message: 'A senha tem que ser maior a 6 carateres'
  }),
  confirmPassword: z.string(),
  dateOfBirth: z.date(),
  plan: z.enum(plans, {
    errorMap: () => ({message: 'Por favor selecione um plano'})
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas devem ser identicas.',
  path: ['confirmPassword']
});

export const userRouter = router({


  create: publicProcedure
    .input(SignUpSchema)
    .mutation(async (opts) => { 
      try {
        const { input } = opts;
        const { name, email, password, dateOfBirth, plan } = input
        // Check if email already exists
        const existingUserByEmail = await db.user.findUnique({
          where: {email: email}
        })

        if (existingUserByEmail) return NextResponse.json({user: null, message: 'Este email ja está sendo usado.'}, {status: 409})


        const hashedPassword = await hash(password, 10)

        const newUser = await db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            plan
          }
        })

        const { password: newPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: 'Usuario criado com sucesso.'}, { status: 201})
      } catch (error) {
        
        return NextResponse.json({message: 'Algo errado não está certo', error}, { status: 500 })
      }
    }),

});