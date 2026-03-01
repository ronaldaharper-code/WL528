import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { auth } from '@/lib/auth'
import { formatDate } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import { CommentThread } from '@/components/comments/CommentThread'
import { Role } from '@prisma/client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const announcement = await sanityClient.fetch(QUERIES.announcementBySlug(slug))
  return {
    title: announcement?.title ?? 'Announcement',
    robots: { index: false },
  }
}

export default async function AnnouncementPage({ params }: Props) {
  const { slug } = await params
  const session = await auth()

  const announcement = await sanityClient.fetch(QUERIES.announcementBySlug(slug)).catch(() => null)
  if (!announcement) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <nav className="text-sm text-stone-500">
        <a href="/member/dashboard" className="hover:text-navy-700">Dashboard</a>
        {' / '}
        <span>{announcement.title}</span>
      </nav>

      <article>
        <header className="mb-6">
          {announcement.pinned && (
            <span className="text-xs text-gold-600 font-semibold uppercase tracking-wide">Pinned</span>
          )}
          <h1 className="font-serif text-2xl font-bold text-navy-900 mt-1">{announcement.title}</h1>
          <p className="text-stone-400 text-sm mt-1">{formatDate(announcement.publishedAt)}</p>
        </header>

        <div className="prose-mason">
          <PortableText value={announcement.body} />
        </div>

        {announcement.attachments?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-stone-200">
            <h2 className="font-semibold text-navy-800 mb-3 text-sm">Attachments</h2>
            <div className="space-y-2">
              {announcement.attachments.map((att: any, i: number) => (
                <a
                  key={i}
                  href={att.file?.asset?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-navy-700 hover:text-navy-900 text-sm underline"
                >
                  <span aria-hidden="true">📎</span>
                  {att.label ?? `Attachment ${i + 1}`}
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Members-only comment thread */}
      <CommentThread
        entityType="ANNOUNCEMENT"
        entityId={announcement._id}
        currentUserId={session!.user.id}
        isAdmin={session!.user.role === Role.ADMIN}
      />
    </div>
  )
}
