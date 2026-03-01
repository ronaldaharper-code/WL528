import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'

const schema = z.object({
  name: z.string().min(2).max(100),
  displayName: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  bio: z.string().max(500).optional(),
  title: z.string().max(100).optional(),
  joinedLodge: z.string().max(10).optional(),
  profileVisible: z.boolean(),
})

export async function PATCH(req: NextRequest) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
    select: { id: true, name: true, displayName: true },
  })

  return NextResponse.json({ user })
}
