import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { formatDateTime } from '@/lib/utils'
import { CommentThread } from '@/components/comments/CommentThread'
import { Role } from '@prisma/client'
import Link from 'next/link'

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Event Details', robots: { index: false } }

export default async function MemberEventPage({ params }: Props) {
  const { id } = await params
  const session = await auth()

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      rsvps: { where: { userId: session!.user.id } },
      _count: { select: { rsvps: { where: { status: 'ATTENDING' } } } },
    },
  })
  if (!event) notFound()

  const hasRSVP = event.rsvps.length > 0 && event.rsvps[0].status === 'ATTENDING'

  return (
    <div className="max-w-2xl space-y-6">
      <nav className="text-sm text-stone-500">
        <Link href="/member/calendar" className="hover:text-navy-700">Calendar</Link>
        {' / '}<span>{event.title}</span>
      </nav>

      <article>
        <header className="mb-6">
          {event.visibility === 'MEMBER' && (
            <span className="text-xs bg-navy-100 text-navy-700 rounded px-2 py-0.5 font-medium">
              Members Only
            </span>
          )}
          <h1 className="font-serif text-2xl font-bold text-navy-900 mt-2">{event.title}</h1>
          <div className="text-stone-500 text-sm mt-2 space-y-1">
            <p><time dateTime={event.startAt.toISOString()}>{formatDateTime(event.startAt)}</time></p>
            {event.location && <p>{event.location}</p>}
            {event.address && <p className="text-stone-400">{event.address}</p>}
          </div>
          {event.maxAttendees && (
            <p className="text-stone-400 text-xs mt-2">
              {event._count.rsvps} / {event.maxAttendees} attending
            </p>
          )}
        </header>

        {event.description && (
          <p className="text-stone-700 leading-relaxed mb-6">{event.description}</p>
        )}

        <div className="flex flex-wrap gap-3">
          {hasRSVP ? (
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-medium text-sm">✓ You are attending</span>
              <form action="/api/rsvp" method="post">
                <button className="text-sm text-stone-500 underline">Cancel RSVP</button>
              </form>
            </div>
          ) : (
            <form action="/api/rsvp" method="post">
              <input type="hidden" name="eventId" value={event.id} />
              <button className="btn-primary text-sm">RSVP — I will attend</button>
            </form>
          )}
          <a href={`/api/events/${event.id}/ics`} className="btn-secondary text-sm">
            Add to Calendar
          </a>
        </div>
      </article>

      <CommentThread
        entityType="EVENT"
        entityId={event.id}
        currentUserId={session!.user.id}
        isAdmin={session!.user.role === Role.ADMIN}
      />
    </div>
  )
}
