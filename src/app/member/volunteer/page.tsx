import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Volunteer Opportunities',
  robots: { index: false },
}

export default async function MemberVolunteerPage() {
  const session = await auth()

  const events = await prisma.volunteerEvent.findMany({
    where: { published: true },
    orderBy: { eventDate: 'asc' },
    include: {
      roles: {
        include: {
          _count: { select: { signups: true } },
          signups: { where: { userId: session!.user.id }, select: { id: true } },
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Volunteer Opportunities</h1>
        <p className="text-stone-500 text-sm mt-1">
          Sign up to serve your Lodge and community. Every brother's contribution matters.
        </p>
      </header>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <p className="font-serif text-lg font-semibold text-navy-800 mb-2">No volunteer events right now</p>
          <p className="text-stone-500 text-sm">Check back soon — new opportunities will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => {
            const totalSlots   = event.roles.reduce((s, r) => s + r.slotsNeeded, 0)
            const totalSignups = event.roles.reduce((s, r) => s + r._count.signups, 0)
            const open         = totalSlots - totalSignups
            const mySignups    = event.roles.reduce((s, r) => s + r.signups.length, 0)

            return (
              <Link
                key={event.id}
                href={`/member/volunteer/${event.id}`}
                className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-navy-800">{event.title}</p>
                    {event.isExternal && (
                      <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">
                        {event.hostOrg ? `Hosted by ${event.hostOrg}` : 'External Event'}
                      </span>
                    )}
                    {mySignups > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                        Signed Up
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-sm mt-0.5">
                    {formatDate(event.eventDate)}{event.location ? ` · ${event.location}` : ''}
                  </p>
                  {event.description && (
                    <p className="text-stone-500 text-sm mt-1 line-clamp-1">{event.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-5 text-sm flex-shrink-0">
                  <div className="text-center">
                    <p className="font-bold text-navy-800">{event.roles.length}</p>
                    <p className="text-stone-400 text-xs">Roles</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${open > 0 ? 'text-amber-600' : 'text-green-600'}`}>{open}</p>
                    <p className="text-stone-400 text-xs">Open Spots</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
