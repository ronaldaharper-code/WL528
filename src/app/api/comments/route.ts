import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { CommentEntityType, CommentStatus } from '@prisma/client'

// GET /api/comments?entityType=EVENT&entityId=xxx
export async function GET(req: NextRequest) {
  const session = await requireMember()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const entityType = url.searchParams.get('entityType') as CommentEntityType
  const entityId = url.searchParams.get('entityId')

  if (!entityType || !entityId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const comments = await prisma.comment.findMany({
    where: {
      entityType,
      entityId,
      parentId: null,
      status: { in: ['APPROVED', 'PENDING'] },
    },
    include: {
      author: { select: { id: true, name: true, displayName: true } },
      replies: {
        where: { status: { in: ['APPROVED', 'PENDING'] } },
        include: { author: { select: { id: true, name: true, displayName: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({ comments })
}

const postSchema = z.object({
  entityType: z.nativeEnum(CommentEntityType),
  entityId: z.string().min(1),
  parentId: z.string().optional(),
  content: z.string().min(1).max(2000),
})

// POST /api/comments
export async function POST(req: NextRequest) {
  const session = await requireMember()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit({ key: `comment:${session.user.id}`, limit: 10, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many comments. Please wait.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Sanitize content
  const content = parsed.data.content.trim()

  // Determine status — first comment from new member requires approval
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { commentApproved: true },
  })
  const status: CommentStatus = user?.commentApproved ? 'APPROVED' : 'PENDING'

  const comment = await prisma.comment.create({
    data: {
      entityType: parsed.data.entityType,
      entityId: parsed.data.entityId,
      parentId: parsed.data.parentId ?? null,
      authorId: session.user.id,
      content,
      status,
    },
    include: {
      author: { select: { id: true, name: true, displayName: true } },
    },
  })

  return NextResponse.json({ comment }, { status: 201 })
}
