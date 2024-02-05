import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import prisma from "@/libs/prismadb"


export const options: AuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID || "",
         clientSecret: process.env.GITHUB_SECRET || "",
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID || "",
         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      Credentials({
         id: "credentials",
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               throw new Error("Email and Password Required")
            }

            const user = await prisma.user.findUnique({ where: { email: credentials.email } })
            if (!user || !user?.hashedPassword) throw new Error("Email does not exist")

            const isValidPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
            if (!isValidPassword) throw new Error("Incorrect Password")

            return user
         },
      }),
   ],
   pages: { signIn: "/auth" },
   debug: process.env.NODE_ENV === "development",
   session: { strategy: "jwt" },
   secret: process.env.NEXTAUTH_SECRET,
   // (optional) because deprecated
   jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
}

export default NextAuth(options)