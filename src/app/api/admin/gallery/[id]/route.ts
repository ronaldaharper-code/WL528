import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

interface Params { params: Promise<{ id: string }> }

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const photo = await prisma.photo.findUnique({ where: { id } })
  if (!photo) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await del(photo.pathname)
  await prisma.photo.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}
