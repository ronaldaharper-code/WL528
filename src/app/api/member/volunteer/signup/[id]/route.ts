import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'

interface Params { params: Promise<{ id: string }> }

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const signup = await prisma.volunteerSignup.findUnique({ where: { id } })
  if (!signup) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (signup.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.volunteerSignup.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
