import { type NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/auth/login',
  },
  
}

