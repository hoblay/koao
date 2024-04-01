import NextAuth from "next-auth/next";

declare module "next-auth"{
  interface User{
    plan: string
  }
  interface Session{
    user: User & {
      plan: string
    },
    token: {
      plan: string
    }
  }
}