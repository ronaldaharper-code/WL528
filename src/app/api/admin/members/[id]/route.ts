import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { Role } from '@prisma/client'

const schema = z.object({
  approved: z.boolean().optional(),
  role: z.nativeEnum(Role).optional(),
  commentApproved: z.boolean().optional(),
})

interface Params { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id },
    data: parsed.data,
  })

  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: 'MEMBER_UPDATED',
      target: id,
      meta: parsed.data,
    },
  })

  return NextResponse.json({ user: { id: user.id, approved: user.approved, role: user.role } })
}
