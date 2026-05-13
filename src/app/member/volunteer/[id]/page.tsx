import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { formatDate } from '@/lib/utils'
import { format } from 'date-fns'
import { SignupButton } from '@/components/member/volunteer/SignupButton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Volunteer Sign-Up',
  robots: { index: false },
}

interface Props { params: Promise<{ id: string }> }

export default async function MemberVolunteerEventPage({ params }: Props) {
  const { id } = await params
  const session = await auth()

  const event = await prisma.volunteerEvent.findUnique({
    where: { id, published: true },
    include: {
      roles: {
        orderBy: { displayOrder: 'asc' },
        include: {
          shifts: {
            orderBy: { date: 'asc' },
            include: {
              signups: {
                include: { user: { select: { id: true, name: true } } },
                orderBy: { createdAt: 'asc' },
              },
            },
          },
        },
      },
    },
  })

  if (!event) notFound()

  const dateRange = event.endDate
    ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
    : formatDate(event.startDate)

  // Collect all of the current user's signups: { shiftId → signupId }
  const mySignups = new Map<string, string>()
  for (const role of event.roles) {
    for (const shift of role.shifts) {
      const mine = shift.signups.find(s => s.userId === session!.user.id)
      if (mine) mySignups.set(shift.id, mine.id)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <Link href="/member/volunteer" className="text-sm text-navy-600 hover:underline">
          ← Volunteer Opportunities
        </Link>
        <h1 className="font-serif text-2xl font-bold text-navy-900 mt-2">{event.title}</h1>
        <p className="text-stone-500 text-sm mt-1">
          {dateRange}
          {event.location ? ` · ${event.location}` : ''}
          {event.isExternal && event.hostOrg ? ` · Hosted by ${event.hostOrg}` : ''}
        </p>
        {event.description && (
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">{event.description}</p>
        )}
      </div>

      {/* Volunteer Needs */}
      <section>
        <h2 className="font-serif text-lg font-bold text-navy-800 mb-4">Volunteer Needs</h2>

        {event.roles.length === 0 ? (
          <p className="text-stone-400 text-sm">No volunteer roles have been defined yet.</p>
        ) : (
          <div className="space-y-6">
            {event.roles.map(role => (
              <div key={role.id}>
                {/* Role header */}
                <div className="mb-2">
                  <h3 className="font-semibold text-navy-800">{role.name}</h3>
                  {role.description && (
                    <p className="text-stone-500 text-sm mt-0.5">{role.description}</p>
                  )}
                  {role.instructions && (
                    <p className="text-stone-400 text-xs mt-1 italic p-2 bg-stone-50 rounded border border-stone-200">
                      {role.instructions}
                    </p>
                  )}
                </div>

                {role.shifts.length === 0 ? (
                  <p className="text-stone-400 text-sm">No shifts scheduled yet.</p>
                ) : (
                  <div className="space-y-2">
                    {role.shifts.map(shift => {
                      const open      = Math.max(0, shift.slotsNeeded - shift.signups.length)
                      const isFull    = open === 0
                      const mySignup  = mySignups.get(shift.id)
                      const shiftTime = [shift.shiftStart, shift.shiftEnd].filter(Boolean).join(' – ')

                      return (
                        <div key={shift.id} className="card p-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-medium text-stone-800 text-sm">
                                {format(new Date(shift.date.getUTCFullYear(), shift.date.getUTCMonth(), shift.date.getUTCDate()), 'EEEE, MMMM d')}
                              </span>
                              {shiftTime && (
                                <span className="text-stone-400 text-xs">{shiftTime}</span>
                              )}
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                mySignup
                                  ? 'bg-green-100 text-green-700'
                                  : isFull
                                    ? 'bg-stone-100 text-stone-500'
                                    : 'bg-amber-100 text-amber-700'
                              }`}>
                                {mySignup ? 'Signed Up' : isFull ? 'Full' : `${open} Open Spot${open > 1 ? 's' : ''}`}
                              </span>
                            </div>

                            {/* Who's signed up */}
                            {shift.signups.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {shift.signups.map(s => (
                                  <span key={s.id} className={`text-xs px-2 py-0.5 rounded-full border ${
                                    s.userId === session!.user.id
                                      ? 'bg-navy-100 text-navy-700 border-navy-200 font-medium'
                                      : 'bg-stone-50 text-stone-600 border-stone-200'
                                  }`}>
                                    {s.user.name ?? 'Brother'}
                                    {s.userId === session!.user.id ? ' (you)' : ''}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex-shrink-0">
                            <SignupButton
                              shiftId={shift.id}
                              signupId={mySignup ?? null}
                              isFull={isFull && !mySignup}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My commitments summary */}
      {mySignups.size > 0 && (
        <section className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-800 text-sm mb-2">Your Commitments</p>
          <ul className="space-y-1">
            {event.roles.flatMap(role =>
              role.shifts
                .filter(sh => mySignups.has(sh.id))
                .map(sh => (
                  <li key={sh.id} className="text-green-700 text-sm flex items-center gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>
                      {role.name} — {format(new Date(sh.date.getUTCFullYear(), sh.date.getUTCMonth(), sh.date.getUTCDate()), 'EEE, MMM d')}
                      {sh.shiftStart ? ` · ${[sh.shiftStart, sh.shiftEnd].filter(Boolean).join(' – ')}` : ''}
                    </span>
                  </li>
                ))
            )}
          </ul>
        </section>
      )}
    </div>
  )
}
