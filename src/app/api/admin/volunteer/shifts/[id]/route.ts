import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const updateSchema = z.object({
  date:        z.string().optional(),
  shiftStart:  z.string().max(20).optional(),
  shiftEnd:    z.string().max(20).optional(),
  slotsNeeded: z.number().int().min(1).max(999).optional(),
})

interface Params { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const parsed = updateSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { date, ...rest } = parsed.data
  const shift = await prisma.volunteerShift.update({
    where: { id },
    data: { ...rest, ...(date ? { date: new Date(date) } : {}) },
  })

  return NextResponse.json({ shift })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const count = await prisma.volunteerSignup.count({ where: { shiftId: id } })
  if (count > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${count} brother(s) are signed up for this shift.` },
      { status: 409 }
    )
  }

  await prisma.volunteerShift.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
