import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  title:       z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  startDate:   z.string().optional(),
  endDate:     z.string().optional(),
  location:    z.string().max(200).optional(),
  isExternal:  z.boolean().optional(),
  hostOrg:     z.string().max(200).optional(),
  published:   z.boolean().optional(),
})

interface Params { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { startDate, endDate, ...rest } = parsed.data
  const event = await prisma.volunteerEvent.update({
    where: { id },
    data: {
      ...rest,
      ...(startDate ? { startDate: new Date(startDate) } : {}),
      ...(endDate !== undefined ? { endDate: endDate ? new Date(endDate) : null } : {}),
    },
  })

  return NextResponse.json({ event })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.volunteerEvent.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
