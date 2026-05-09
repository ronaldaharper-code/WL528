import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  name:         z.string().min(1).max(120),
  description:  z.string().max(500).optional(),
  slotsNeeded:  z.number().int().min(1).max(999),
  shiftStart:   z.string().max(20).optional(),
  shiftEnd:     z.string().max(20).optional(),
  instructions: z.string().max(1000).optional(),
  displayOrder: z.number().int().optional(),
})

interface Params { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: eventId } = await params
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  // Auto-set displayOrder to max + 1 if not provided
  if (parsed.data.displayOrder === undefined) {
    const max = await prisma.volunteerRole.aggregate({
      where: { eventId },
      _max: { displayOrder: true },
    })
    parsed.data.displayOrder = (max._max.displayOrder ?? 0) + 1
  }

  const role = await prisma.volunteerRole.create({
    data: { ...parsed.data, eventId },
  })

  return NextResponse.json({ role }, { status: 201 })
}
