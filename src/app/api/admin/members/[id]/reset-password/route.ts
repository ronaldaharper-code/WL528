import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { sendEmail, passwordResetHtml } from '@/lib/email'
import { siteConfig } from '@/config/site'

interface Params { params: Promise<{ id: string }> }

export async function POST(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    select: { email: true, name: true },
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const token = crypto.randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await prisma.user.update({
    where: { id },
    data: { passwordResetToken: token, passwordResetExpiry: expiry },
  })

  const resetUrl = `${siteConfig.url}/auth/reset-password?token=${token}`

  let emailOk = false
  try {
    await sendEmail({
      to: user.email,
      subject: 'Reset your Walled Lake Lodge password',
      html: passwordResetHtml(user.name ?? 'Member', resetUrl),
    })
    emailOk = true
  } catch {
    // email delivery failed — admin can share resetUrl manually
  }

  await prisma.auditLog.create({
    data: { actorId: session.user.id, action: 'PASSWORD_RESET_SENT', target: id },
  })

  return NextResponse.json({ ok: true, emailOk, resetUrl })
}
