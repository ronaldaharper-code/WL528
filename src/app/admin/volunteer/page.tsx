import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminVolunteerPage() {
  const events = await prisma.volunteerEvent.findMany({
    orderBy: { startDate: 'asc' },
    include: {
      roles: {
        include: {
          shifts: { include: { _count: { select: { signups: true } } } },
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Volunteer Events</h1>
          <p className="text-stone-500 text-sm mt-1">Create events, define roles, and add shifts for brothers to fill.</p>
        </div>
        <Link href="/admin/volunteer/new" className="btn btn-primary">
          + New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <p className="font-serif text-lg font-semibold text-navy-800 mb-2">No volunteer events yet</p>
          <p className="text-stone-500 text-sm mb-6">Create your first event to start collecting volunteers.</p>
          <Link href="/admin/volunteer/new" className="btn btn-primary">Create Event</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const allShifts    = event.roles.flatMap(r => r.shifts)
            const totalSlots   = allShifts.reduce((s, sh) => s + sh.slotsNeeded, 0)
            const totalSignups = allShifts.reduce((s, sh) => s + sh._count.signups, 0)
            const open         = totalSlots - totalSignups
            const dateRange    = event.endDate
              ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
              : formatDate(event.startDate)

            return (
              <Link
                key={event.id}
                href={`/admin/volunteer/${event.id}`}
                className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-navy-800">{event.title}</p>
                    {event.isExternal && (
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">External</span>
                    )}
                    {!event.published && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">Draft</span>
                    )}
                  </div>
                  <p className="text-stone-500 text-sm mt-0.5">
                    {dateRange}{event.location ? ` · ${event.location}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm flex-shrink-0">
                  <div className="text-center">
                    <p className="font-bold text-navy-800">{allShifts.length}</p>
                    <p className="text-stone-400 text-xs">Shifts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-navy-800">{totalSignups}</p>
                    <p className="text-stone-400 text-xs">Signed Up</p>
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
