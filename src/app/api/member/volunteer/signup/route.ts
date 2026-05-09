import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'

const schema = z.object({
  roleId: z.string().min(1),
  note:   z.string().max(300).optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { roleId, note } = parsed.data

  // Check the role exists and has open slots
  const role = await prisma.volunteerRole.findUnique({
    where: { id: roleId },
    include: { _count: { select: { signups: true } } },
  })
  if (!role) return NextResponse.json({ error: 'Role not found' }, { status: 404 })
  if (role._count.signups >= role.slotsNeeded) {
    return NextResponse.json({ error: 'This role is full.' }, { status: 409 })
  }

  const signup = await prisma.volunteerSignup.create({
    data: { roleId, userId: session.user.id, note },
  })

  return NextResponse.json({ signup }, { status: 201 })
}
