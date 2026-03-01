import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'
import { Role } from '@prisma/client'

interface Params { params: Promise<{ id: string }> }

// PATCH /api/comments/[id] — edit own comment within 15 min
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const comment = await prisma.comment.findUnique({ where: { id } })
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (comment.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ageMs = Date.now() - comment.createdAt.getTime()
  if (ageMs > 15 * 60 * 1000) {
    return NextResponse.json({ error: 'Edit window has expired (15 minutes)' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const content = typeof body.content === 'string' ? body.content.trim() : ''
  if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 })

  const updated = await prisma.comment.update({
    where: { id },
    data: { content },
  })

  return NextResponse.json({ comment: updated })
}

// DELETE /api/comments/[id] — soft delete, own or admin
export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const comment = await prisma.comment.findUnique({ where: { id } })
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isOwn = comment.authorId === session.user.id
  const isAdmin = session.user.role === Role.ADMIN

  if (!isOwn && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.comment.update({
    where: { id },
    data: {
      status: 'REMOVED',
      removedAt: new Date(),
      removedById: session.user.id,
    },
  })

  // Audit log
  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: 'COMMENT_REMOVED',
      target: id,
    },
  })

  return NextResponse.json({ success: true })
}
