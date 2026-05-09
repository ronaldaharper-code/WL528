import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { formatDate } from '@/lib/utils'
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
          signups: {
            include: { user: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  })

  if (!event) notFound()

  const mySignupIds = new Set(
    event.roles.flatMap(r =>
      r.signups.filter(s => s.userId === session!.user.id).map(s => s.id)
    )
  )
  const myRoleIds = new Set(
    event.roles
      .filter(r => r.signups.some(s => s.userId === session!.user.id))
      .map(r => r.id)
  )

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <Link href="/member/volunteer" className="text-sm text-navy-600 hover:underline">
          ← Volunteer Opportunities
        </Link>
        <h1 className="font-serif text-2xl font-bold text-navy-900 mt-2">{event.title}</h1>
        <p className="text-stone-500 text-sm mt-1">
          {formatDate(event.eventDate)}
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
          <div className="space-y-4">
            {event.roles.map(role => {
              const open      = Math.max(0, role.slotsNeeded - role.signups.length)
              const isFull    = open === 0
              const mySignup  = role.signups.find(s => s.userId === session!.user.id)

              return (
                <div key={role.id} className="card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-navy-800">{role.name}</h3>
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

                      {role.description && (
                        <p className="text-stone-500 text-sm mb-2">{role.description}</p>
                      )}

                      <div className="flex flex-wrap gap-3 text-xs text-stone-400">
                        {(role.shiftStart || role.shiftEnd) && (
                          <span>Shift: {[role.shiftStart, role.shiftEnd].filter(Boolean).join(' – ')}</span>
                        )}
                        <span>{role.signups.length} / {role.slotsNeeded} filled</span>
                      </div>

                      {role.instructions && (
                        <p className="text-stone-500 text-xs mt-2 p-2 bg-stone-50 rounded border border-stone-200 italic">
                          {role.instructions}
                        </p>
                      )}

                      {/* Who's signed up */}
                      {role.signups.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {role.signups.map(s => (
                            <span
                              key={s.id}
                              className={`text-xs px-2 py-0.5 rounded-full border ${
                                s.userId === session!.user.id
                                  ? 'bg-navy-100 text-navy-700 border-navy-200 font-medium'
                                  : 'bg-stone-50 text-stone-600 border-stone-200'
                              }`}
                            >
                              {s.user.name ?? 'Brother'}
                              {s.userId === session!.user.id ? ' (you)' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <SignupButton
                        roleId={role.id}
                        signupId={mySignup?.id ?? null}
                        isFull={isFull && !mySignup}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {mySignupIds.size > 0 && (
        <section className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-800 text-sm mb-1">Your Commitments</p>
          <ul className="space-y-1">
            {event.roles
              .filter(r => myRoleIds.has(r.id))
              .map(r => (
                <li key={r.id} className="text-green-700 text-sm flex items-center gap-2">
                  <span aria-hidden="true">✓</span>
                  {r.name}
                  {r.shiftStart ? ` · ${[r.shiftStart, r.shiftEnd].filter(Boolean).join(' – ')}` : ''}
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  )
}
