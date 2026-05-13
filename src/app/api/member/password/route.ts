import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
})

export async function PATCH(req: NextRequest) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  })
  if (!user?.passwordHash) {
    return NextResponse.json({ error: 'No password set on this account' }, { status: 400 })
  }

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
  if (!valid) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash },
  })

  return NextResponse.json({ ok: true })
}
