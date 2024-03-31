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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
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

