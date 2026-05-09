import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  title:   z.string().min(2).max(200),
  excerpt: z.string().max(500).optional(),
  body:    z.string().max(10000).optional(),
  pinned:  z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const announcement = await prisma.announcement.create({ data: parsed.data })
  return NextResponse.json({ announcement }, { status: 201 })
}
