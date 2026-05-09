import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
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
          signups: {
            include: { user: { select: { id: true, name: true, email: true, phone: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  })

  if (!event) notFound()

  const totalSlots   = event.roles.reduce((s, r) => s + r.slotsNeeded, 0)
  const totalSignups = event.roles.reduce((s, r) => s + r.signups.length, 0)
  const gapRoles     = event.roles.filter(r => r.signups.length < r.slotsNeeded)

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
              {formatDate(event.eventDate)}
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

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Roles', value: event.roles.length },
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
      {gapRoles.length > 0 && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-800 text-sm mb-2">Coverage Gaps</p>
          <ul className="space-y-1">
            {gapRoles.map(r => (
              <li key={r.id} className="text-amber-700 text-sm flex justify-between">
                <span>{r.name}</span>
                <span>{r.signups.length} / {r.slotsNeeded} filled</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Volunteer Needs + Role Manager (client) ── */}
      <RoleManager eventId={event.id} initialRoles={event.roles} />

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
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Brother</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {event.roles.flatMap(role =>
                  role.signups.map(signup => (
                    <tr key={signup.id} className="hover:bg-stone-50">
                      <td className="px-4 py-3 font-medium text-navy-800">{role.name}</td>
                      <td className="px-4 py-3 text-stone-700">{signup.user.name ?? '—'}</td>
                      <td className="px-4 py-3 text-stone-500">{signup.user.email}</td>
                      <td className="px-4 py-3 text-stone-500">{signup.user.phone ?? '—'}</td>
                      <td className="px-4 py-3 text-stone-500">
                        {role.shiftStart && role.shiftEnd
                          ? `${role.shiftStart} – ${role.shiftEnd}`
                          : role.shiftStart ?? '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  )
}
