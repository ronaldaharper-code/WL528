import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'

const schema = z.object({
  shiftId: z.string().min(1),
  note:    z.string().max(300).optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { shiftId, note } = parsed.data

  const shift = await prisma.volunteerShift.findUnique({
    where: { id: shiftId },
    include: { _count: { select: { signups: true } } },
  })
  if (!shift) return NextResponse.json({ error: 'Shift not found' }, { status: 404 })
  if (shift._count.signups >= shift.slotsNeeded) {
    return NextResponse.json({ error: 'This shift is full.' }, { status: 409 })
  }

  const signup = await prisma.volunteerSignup.create({
    data: { shiftId, userId: session.user.id, note },
  })

  return NextResponse.json({ signup }, { status: 201 })
}
