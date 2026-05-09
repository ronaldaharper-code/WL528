import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  title:       z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  startDate:   z.string().min(1),
  endDate:     z.string().optional(),
  location:    z.string().max(200).optional(),
  isExternal:  z.boolean().optional(),
  hostOrg:     z.string().max(200).optional(),
  published:   z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { startDate, endDate, ...rest } = parsed.data
  const event = await prisma.volunteerEvent.create({
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate:   endDate ? new Date(endDate) : null,
      createdById: session.user.id,
    },
  })

  return NextResponse.json({ event }, { status: 201 })
}
