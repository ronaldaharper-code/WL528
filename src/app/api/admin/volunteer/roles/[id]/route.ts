import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  name:         z.string().min(1).max(120).optional(),
  description:  z.string().max(500).optional(),
  slotsNeeded:  z.number().int().min(1).max(999).optional(),
  shiftStart:   z.string().max(20).optional(),
  shiftEnd:     z.string().max(20).optional(),
  instructions: z.string().max(1000).optional(),
  displayOrder: z.number().int().optional(),
})

interface Params { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const role = await prisma.volunteerRole.update({ where: { id }, data: parsed.data })
  return NextResponse.json({ role })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const signupCount = await prisma.volunteerSignup.count({ where: { roleId: id } })
  if (signupCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${signupCount} brother(s) are signed up for this role.` },
      { status: 409 }
    )
  }

  await prisma.volunteerRole.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
