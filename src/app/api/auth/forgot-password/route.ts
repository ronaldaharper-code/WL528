import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendEmail, passwordResetHtml } from '@/lib/email'
import { siteConfig } from '@/config/site'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase().trim() },
    select: { id: true, email: true, name: true, approved: true },
  })

  // Always return the same response to prevent email enumeration
  if (!user || !user.approved) {
    return NextResponse.json({ ok: true })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordResetToken: token, passwordResetExpiry: expiry },
  })

  const resetUrl = `${siteConfig.url}/auth/reset-password?token=${token}`

  await sendEmail({
    to: user.email!,
    subject: 'Reset your Walled Lake Lodge password',
    html: passwordResetHtml(user.name ?? 'Member', resetUrl),
  }).catch(() => {})

  return NextResponse.json({ ok: true })
}
