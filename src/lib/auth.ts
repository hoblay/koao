import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db), 
  session:{
    strategy: "jwt" 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null


        const existingUser = await db.user.findUnique({
          where: {email: credentials.email}
        })

        if(!existingUser) return null

        const matchingPassword = await compare(credentials?.password, existingUser.password)
        if(!matchingPassword) return null

        

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
          dateOfBirth: existingUser.dateOfBirth,
          plan: existingUser.plan,
          image: existingUser.image,
        }

        }
      }
    
    )]
  
}

