/**
 * POST /api/auth/check-account
 *
 * Called by SignInForm after a failed login attempt to give a more helpful
 * error message without leaking sensitive information.
 *
 * Returns one of:
 *   { status: 'not_found' }         — no account with that email
 *   { status: 'pending_approval' }  — account exists, awaiting admin approval
 *   { status: 'active' }            — account exists and is approved
 *
 * NOTE: This reveals whether an email is registered. That is an acceptable
 * tradeoff for a closed members-only system.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit({ key: `check-account:${ip}`, limit: 10, windowMs: 60_000 })) {
    return NextResponse.json({ status: 'not_found' }) // silent fail on abuse
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ status: 'not_found' })
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase().trim() },
    select: { approved: true },
  }).catch(() => null)

  if (!user) return NextResponse.json({ status: 'not_found' })
  if (!user.approved) return NextResponse.json({ status: 'pending_approval' })
  return NextResponse.json({ status: 'active' })
}
