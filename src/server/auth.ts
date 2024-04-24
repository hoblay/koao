import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) return null;

        const matchingPassword = await compare(
          credentials?.password,
          existingUser.password,
        );
        if (!matchingPassword) return null;

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
          dateOfBirth: existingUser.dateOfBirth,
          plan: `${existingUser.plan}`,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      const getRandomBackgroundColor = () => {
        const colors = [
          "green",
          "purple",
          "emerald",
          "orange",
          "pink",
          "blue",
          "amber",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };
      const color = getRandomBackgroundColor();
      if (user)
        return {
          ...token,
          id: user.id,
          plan: user.plan,
          color,
        };
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          plan: token.plan,
          color: token.color,
        },
      };
    },
  },
};
