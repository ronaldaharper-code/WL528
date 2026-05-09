import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const title   = (formData.get('title')   as string | null)?.trim() || null
  const caption = (formData.get('caption') as string | null)?.trim() || null

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const blob = await put(`gallery/${Date.now()}-${safeName}`, file, { access: 'public' })

  const photo = await prisma.photo.create({
    data: { title, caption, imageUrl: blob.url, pathname: blob.pathname },
  })

  return NextResponse.json({ photo }, { status: 201 })
}
