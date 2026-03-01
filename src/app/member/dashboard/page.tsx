import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Member Dashboard',
  robots: { index: false },
}

async function getDashboardData(userId: string) {
  const [announcements, upcomingEvents, myRsvps] = await Promise.all([
    sanityClient.fetch(QUERIES.announcements).catch(() => []),
    prisma.event.findMany({
      where: { startAt: { gte: new Date() } },
      orderBy: { startAt: 'asc' },
      take: 5,
    }),
    prisma.rSVP.findMany({
      where: { userId, status: 'ATTENDING' },
      include: { event: true },
      orderBy: { event: { startAt: 'asc' } },
      take: 5,
    }),
  ])
  return { announcements, upcomingEvents, myRsvps }
}

export default async function MemberDashboardPage() {
  const session = await auth()
  const { announcements, upcomingEvents, myRsvps } = await getDashboardData(session!.user.id)

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">
          Welcome, {session!.user.name?.split(' ')[0] ?? 'Brother'}
        </h1>
        <p className="text-stone-500 text-sm mt-1">Walled Lake Lodge #528 Member Portal</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <section aria-labelledby="announcements-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="announcements-heading" className="font-serif text-lg font-bold text-navy-800">
              Announcements
            </h2>
          </div>
          {announcements.length === 0 ? (
            <p className="text-stone-400 text-sm">No announcements at this time.</p>
          ) : (
            <div className="space-y-3">
              {announcements.slice(0, 5).map((a: any) => (
                <Link
                  key={a._id}
                  href={`/member/announcements/${a.slug?.current}`}
                  className="block card p-4 hover:shadow-md"
                >
                  {a.pinned && (
                    <span className="text-xs text-gold-600 font-medium uppercase tracking-wide">Pinned</span>
                  )}
                  <p className="font-medium text-navy-800 text-sm">{a.title}</p>
                  <p className="text-stone-500 text-xs mt-1">{formatDate(a.publishedAt)}</p>
                  {a.excerpt && (
                    <p className="text-stone-600 text-xs mt-1 line-clamp-2">{a.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Events */}
        <section aria-labelledby="events-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="events-heading" className="font-serif text-lg font-bold text-navy-800">
              Upcoming Events
            </h2>
            <Link href="/member/calendar" className="text-sm text-navy-600 hover:text-navy-800">
              Full Calendar →
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-stone-400 text-sm">No upcoming events scheduled.</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="card p-4 flex gap-4 items-start">
                  {/* Date block */}
                  <div className="flex-shrink-0 w-12 text-center bg-navy-50 rounded p-2 border border-navy-100">
                    <div className="text-gold-600 text-xs font-bold uppercase">{formatDate(event.startAt, 'MMM')}</div>
                    <div className="text-navy-900 text-xl font-bold leading-none">{formatDate(event.startAt, 'd')}</div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-navy-800 text-sm truncate">{event.title}</p>
                    <p className="text-stone-500 text-xs mt-0.5">
                      {formatDate(event.startAt, 'h:mm a')}
                      {event.visibility === 'MEMBER' && (
                        <span className="ml-2 text-navy-500">Members only</span>
                      )}
                    </p>
                    {event.location && (
                      <p className="text-stone-500 text-xs">{event.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* My RSVPs */}
      {myRsvps.length > 0 && (
        <section aria-labelledby="rsvps-heading">
          <h2 id="rsvps-heading" className="font-serif text-lg font-bold text-navy-800 mb-4">
            My Upcoming RSVPs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {myRsvps.map((rsvp) => (
              <div key={rsvp.id} className="card p-4 flex gap-3 items-center">
                <span className="text-green-500" aria-hidden="true">✓</span>
                <div>
                  <p className="font-medium text-navy-800 text-sm">{rsvp.event.title}</p>
                  <p className="text-stone-500 text-xs">{formatDate(rsvp.event.startAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
