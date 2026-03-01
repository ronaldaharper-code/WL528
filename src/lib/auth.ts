import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { Role } from '@prisma/client'
import { z } from 'zod'

// ── Type Augmentation ─────────────────────────────────────────────────────────
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      approved: boolean
    } & DefaultSession['user']
  }
  interface User {
    role: Role
    approved: boolean
    pendingApproval?: boolean
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// ── Auth Configuration ────────────────────────────────────────────────────────
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Validate input shape
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        // 2. Look up user — always select passwordHash explicitly
        let user: {
          id: string; email: string; name: string | null; image: string | null
          passwordHash: string | null; role: Role; approved: boolean
        } | null = null

        try {
          user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            select: {
              id: true, email: true, name: true, image: true,
              passwordHash: true, role: true, approved: true,
            },
          })
        } catch (dbErr) {
          // DB unavailable — throw so NextAuth shows a server error, not credential error
          console.error('[auth] DB lookup failed:', dbErr)
          throw new Error('ServerError')
        }

        // 3. User not found — return null (no info leak about existence)
        if (!user || !user.passwordHash) return null

        // 4. Password check first (do this even for unapproved — timing consistency)
        let passwordValid = false
        try {
          passwordValid = await bcrypt.compare(password, user.passwordHash)
        } catch {
          throw new Error('ServerError')
        }

        if (!passwordValid) return null

        // 5. Account pending approval — return null but encode state in token
        //    The SignInForm calls /api/auth/check-account separately to surface this.
        if (!user.approved) return null

        // 6. All checks passed
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          approved: user.approved,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id       = user.id
        token.role     = user.role
        token.approved = user.approved
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id       = token.id as string
        session.user.role     = token.role as Role
        session.user.approved = token.approved as boolean
      }
      return session
    },
  },
})

// ── Route Helpers ─────────────────────────────────────────────────────────────
export async function requireMember() {
  const session = await auth()
  if (!session?.user?.id) return null
  if (!session.user.approved)  return null
  return session
}

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id) return null
  if (session.user.role !== Role.ADMIN) return null
  return session
}
