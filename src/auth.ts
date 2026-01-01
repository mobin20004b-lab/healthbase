
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
// We will need a way to access DB. Ideally we create a lib/prisma.ts.
// For now I'll stub it.

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Validation
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          // TODO: Fetch user from DB
          // const user = await getUser(email)
          // if (!user) return null
          // const passwordsMatch = await bcrypt.compare(password, user.passwordHash)
          // if (passwordsMatch) return user

          // Mock for now
          if (email === "test@example.com" && password === "password") {
              return { id: "1", name: "Test User", email: "test@example.com", role: "USER" }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.role = (user as any).role
              token.id = user.id
          }
          return token
      },
      async session({ session, token }) {
          if (token && session.user) {
              (session.user as any).role = token.role;
              (session.user as any).id = token.id;
          }
          return session
      }
  }
})
