import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  date:        z.string().min(1),
  shiftStart:  z.string().max(20).optional(),
  shiftEnd:    z.string().max(20).optional(),
  slotsNeeded: z.number().int().min(1).max(999),
})

interface Params { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: roleId } = await params
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { date, ...rest } = parsed.data
  const shift = await prisma.volunteerShift.create({
    data: { ...rest, date: new Date(date), roleId },
  })

  return NextResponse.json({ shift }, { status: 201 })
}
