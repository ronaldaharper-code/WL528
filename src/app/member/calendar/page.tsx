import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { auth } from '@/lib/auth'
import { MemberCalendar } from '@/components/member/MemberCalendar'

export const metadata: Metadata = {
  title: 'Member Calendar',
  robots: { index: false },
}

export default async function MemberCalendarPage() {
  const session = await auth()

  const [dbEvents, sanityEvents] = await Promise.all([
    prisma.event.findMany({
      where: { startAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      orderBy: { startAt: 'asc' },
      include: {
        rsvps: { where: { userId: session!.user.id } },
      },
    }),
    sanityClient.fetch(QUERIES.memberEvents).catch(() => []),
  ])

  const events = [
    ...dbEvents.map((e) => ({
      id: e.id,
      title: e.title,
      startAt: e.startAt.toISOString(),
      endAt: e.endAt?.toISOString(),
      location: e.location,
      visibility: e.visibility,
      hasRSVP: e.rsvps.length > 0,
      source: 'db' as const,
    })),
    ...sanityEvents.map((e: any) => ({
      id: e._id,
      title: e.title,
      startAt: e.startAt,
      endAt: e.endAt,
      location: e.location,
      visibility: 'MEMBER',
      hasRSVP: false,
      source: 'sanity' as const,
    })),
  ].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Lodge Calendar</h1>
        <p className="text-stone-500 text-sm mt-1">
          All lodge meetings and member events. Public events also shown.
        </p>
      </header>
      <MemberCalendar events={events} userId={session!.user.id} />
    </div>
  )
}
