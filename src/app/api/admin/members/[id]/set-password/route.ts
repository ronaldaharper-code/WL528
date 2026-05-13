import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

interface Params { params: Promise<{ id: string }> }

function tempPasswordEmailHtml(name: string, email: string, password: string) {
  return `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
  <h2 style="color:#1e3a5f">Your Walled Lake Lodge Password Has Been Reset</h2>
  <p>Hi ${name},</p>
  <p>An administrator has set a temporary password for your member portal account. Use it to sign in, then update it from your profile page.</p>
  <table cellpadding="8" style="background:#f5f5f4;border-radius:6px;margin:20px 0">
    <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
    <tr><td><strong>Temporary Password:</strong></td><td style="font-family:monospace;font-size:16px">${password}</td></tr>
  </table>
  <p>
    <a href="https://wl-528.vercel.app/auth/signin" style="background:#1e3a5f;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">
      Sign In Now
    </a>
  </p>
  <p style="color:#78716c;font-size:13px">After signing in, go to <strong>My Profile</strong> to set a new password of your choice.</p>
</div>
`
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { email: true, name: true },
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const passwordHash = await bcrypt.hash(parsed.data.password, 12)

  await prisma.user.update({
    where: { id },
    data: {
      passwordHash,
      passwordResetToken: null,
      passwordResetExpiry: null,
    },
  })

  let emailOk = false
  try {
    await sendEmail({
      to: user.email!,
      subject: 'Your Walled Lake Lodge password has been reset',
      html: tempPasswordEmailHtml(user.name ?? 'Member', user.email!, parsed.data.password),
    })
    emailOk = true
  } catch {
    // email failed — caller can share password manually
  }

  await prisma.auditLog.create({
    data: { actorId: session.user.id, action: 'ADMIN_SET_PASSWORD', target: id },
  })

  return NextResponse.json({ ok: true, emailOk })
}
