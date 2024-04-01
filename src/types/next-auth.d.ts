import NextAuth from "next-auth/next";

declare module "next-auth"{
  interface User{
    id: string,
    name: string,
    email: string,
    image: string,
    plan: string, 
    color?: "purple" | "green" | "emerald" | "orange" | "pink" | "blue" | "amber"
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