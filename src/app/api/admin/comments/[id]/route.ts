import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { CommentStatus } from '@prisma/client'

const schema = z.object({
  status: z.nativeEnum(CommentStatus),
})

interface Params { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

  const update: Record<string, unknown> = { status: parsed.data.status }
  if (parsed.data.status === 'REMOVED') {
    update.removedAt = new Date()
    update.removedById = session.user.id
  }

  // If approving a comment, also approve the user's future comments
  if (parsed.data.status === 'APPROVED') {
    const comment = await prisma.comment.findUnique({ where: { id } })
    if (comment) {
      await prisma.user.update({
        where: { id: comment.authorId },
        data: { commentApproved: true },
      })
    }
  }

  const comment = await prisma.comment.update({
    where: { id },
    data: update,
  })

  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: `COMMENT_${parsed.data.status}`,
      target: id,
    },
  })

  return NextResponse.json({ comment })
}
