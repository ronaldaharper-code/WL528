import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { format } from 'date-fns'
import { RoleManager } from '@/components/admin/volunteer/RoleManager'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

export default async function AdminVolunteerEventPage({ params }: Props) {
  const { id } = await params

  const event = await prisma.volunteerEvent.findUnique({
    where: { id },
    include: {
      createdBy: { select: { name: true } },
      roles: {
        orderBy: { displayOrder: 'asc' },
        include: {
          shifts: {
            orderBy: { date: 'asc' },
            include: {
              signups: {
                include: { user: { select: { id: true, name: true, email: true, phone: true } } },
                orderBy: { createdAt: 'asc' },
              },
            },
          },
        },
      },
    },
  })

  if (!event) notFound()

  const allShifts    = event.roles.flatMap(r => r.shifts)
  const totalSlots   = allShifts.reduce((s, sh) => s + sh.slotsNeeded, 0)
  const totalSignups = allShifts.reduce((s, sh) => s + sh.signups.length, 0)
  const gapShifts    = allShifts.filter(sh => sh.signups.length < sh.slotsNeeded)
  const dateRange    = event.endDate
    ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
    : formatDate(event.startDate)

  return (
    <div className="space-y-8 max-w-4xl">

      {/* ── Header ── */}
      <div>
        <Link href="/admin/volunteer" className="text-sm text-navy-600 hover:underline">
          ← Volunteer Events
        </Link>
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif text-2xl font-bold text-navy-900">{event.title}</h1>
              {event.isExternal && (
                <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">External</span>
              )}
              {!event.published && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">Draft</span>
              )}
            </div>
            <p className="text-stone-500 text-sm mt-1">
              {dateRange}
              {event.location ? ` · ${event.location}` : ''}
              {event.isExternal && event.hostOrg ? ` · Hosted by ${event.hostOrg}` : ''}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={`/api/admin/volunteer/events/${event.id}/roster`}
              className="btn btn-secondary text-sm"
            >
              Export Volunteer List
            </a>
            <DeleteButton endpoint={`/api/admin/volunteer/events/${event.id}`} redirectTo="/admin/volunteer" />
          </div>
        </div>
        {event.description && (
          <p className="text-stone-600 text-sm mt-3 max-w-2xl">{event.description}</p>
        )}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Shifts', value: allShifts.length },
          { label: 'Signed Up', value: totalSignups },
          { label: 'Open Spots', value: totalSlots - totalSignups, highlight: totalSlots - totalSignups > 0 },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="card p-4 text-center">
            <p className={`text-2xl font-bold ${highlight ? 'text-amber-600' : 'text-navy-800'}`}>{value}</p>
            <p className="text-stone-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Coverage gaps ── */}
      {gapShifts.length > 0 && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-800 text-sm mb-2">Coverage Gaps</p>
          <ul className="space-y-1">
            {gapShifts.map(sh => {
              const role = event.roles.find(r => r.shifts.some(s => s.id === sh.id))
              const shiftLabel = [
                format(new Date(sh.date), 'EEE, MMM d'),
                sh.shiftStart && sh.shiftEnd ? `${sh.shiftStart} – ${sh.shiftEnd}` : sh.shiftStart,
              ].filter(Boolean).join(' · ')
              return (
                <li key={sh.id} className="text-amber-700 text-sm flex justify-between">
                  <span>{role?.name} — {shiftLabel}</span>
                  <span>{sh.signups.length} / {sh.slotsNeeded} filled</span>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* ── Role + Shift Manager ── */}
      <RoleManager
        eventId={event.id}
        eventStartDate={event.startDate.toISOString().split('T')[0]}
        eventEndDate={event.endDate ? event.endDate.toISOString().split('T')[0] : undefined}
        initialRoles={event.roles.map(role => ({
          ...role,
          shifts: role.shifts.map(sh => ({
            ...sh,
            date: sh.date.toISOString(),
          })),
        }))}
      />

      {/* ── Roster ── */}
      <section>
        <h2 className="font-serif text-lg font-bold text-navy-800 mb-4">Roster</h2>
        {totalSignups === 0 ? (
          <p className="text-stone-400 text-sm">No brothers have signed up yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Role</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Shift</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Brother</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {event.roles.flatMap(role =>
                  role.shifts.flatMap(shift =>
                    shift.signups.map(signup => (
                      <tr key={signup.id} className="hover:bg-stone-50">
                        <td className="px-4 py-3 font-medium text-navy-800">{role.name}</td>
                        <td className="px-4 py-3 text-stone-600">{format(new Date(shift.date), 'EEE, MMM d')}</td>
                        <td className="px-4 py-3 text-stone-500">
                          {shift.shiftStart && shift.shiftEnd
                            ? `${shift.shiftStart} – ${shift.shiftEnd}`
                            : shift.shiftStart ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-stone-700">{signup.user.name ?? '—'}</td>
                        <td className="px-4 py-3 text-stone-500">{signup.user.email}</td>
                        <td className="px-4 py-3 text-stone-500">{signup.user.phone ?? '—'}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  )
}
