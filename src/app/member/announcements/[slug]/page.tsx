export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Announcement',
  robots: { index: false },
}

interface Props { params: Promise<{ slug: string }> }

export default async function AnnouncementPage({ params }: Props) {
  const { slug } = await params
  const announcement = await prisma.announcement.findUnique({ where: { id: slug } })
  if (!announcement) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/member/dashboard" className="text-sm text-navy-600 hover:underline">← Back to Dashboard</Link>

      <article>
        <div className="flex items-center gap-2 mb-2">
          {announcement.pinned && (
            <span className="text-xs bg-gold-100 text-gold-700 font-semibold px-2 py-0.5 rounded">Pinned</span>
          )}
          <p className="text-stone-400 text-sm">{formatDate(announcement.publishedAt)}</p>
        </div>
        <h1 className="font-serif text-2xl font-bold text-navy-900 mb-4">{announcement.title}</h1>
        {announcement.body ? (
          <div className="prose prose-stone max-w-none text-stone-700 whitespace-pre-wrap">
            {announcement.body}
          </div>
        ) : announcement.excerpt ? (
          <p className="text-stone-700">{announcement.excerpt}</p>
        ) : null}
      </article>
    </div>
  )
}
