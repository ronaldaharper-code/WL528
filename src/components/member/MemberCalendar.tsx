'use client'

import { useState } from 'react'
import { formatDate, formatDateTime } from '@/lib/utils'
import Link from 'next/link'

interface CalendarEvent {
  id: string
  title: string
  startAt: string
  endAt?: string
  location?: string | null
  visibility: string
  hasRSVP: boolean
  source: 'db' | 'sanity'
}

interface Props {
  events: CalendarEvent[]
  userId: string
}

type ViewMode = 'list' | 'month'

export function MemberCalendar({ events, userId }: Props) {
  const [view, setView] = useState<ViewMode>('list')
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>(
    Object.fromEntries(events.map((e) => [e.id, e.hasRSVP]))
  )
  const [loading, setLoading] = useState<string | null>(null)

  const handleRSVP = async (eventId: string, attending: boolean) => {
    setLoading(eventId)
    try {
      await fetch('/api/rsvp', {
        method: attending ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      })
      setRsvpStatus((prev) => ({ ...prev, [eventId]: attending }))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      {/* View Switcher */}
      <div className="flex gap-2 mb-6">
        {(['list', 'month'] as ViewMode[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors capitalize ${
              view === v
                ? 'bg-navy-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-4">
          {events.length === 0 && (
            <p className="text-stone-400 text-sm">No upcoming events.</p>
          )}
          {events.map((event) => (
            <article key={event.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Date block */}
                <div className="flex-shrink-0 w-16 text-center bg-navy-50 rounded p-2 border border-navy-100">
                  <div className="text-gold-600 text-xs font-bold uppercase leading-tight">
                    {formatDate(event.startAt, 'MMM')}
                  </div>
                  <div className="text-navy-900 text-2xl font-bold leading-tight">
                    {formatDate(event.startAt, 'd')}
                  </div>
                  <div className="text-stone-500 text-xs">
                    {formatDate(event.startAt, 'yyyy')}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-base font-bold text-navy-800">{event.title}</h3>
                    {event.visibility === 'MEMBER' && (
                      <span className="flex-shrink-0 text-xs bg-navy-100 text-navy-700 rounded px-2 py-0.5">
                        Members Only
                      </span>
                    )}
                  </div>

                  <p className="text-stone-500 text-sm mt-1">
                    <time dateTime={event.startAt}>{formatDateTime(event.startAt)}</time>
                  </p>

                  {event.location && (
                    <p className="text-stone-500 text-sm">{event.location}</p>
                  )}

                  {/* RSVP (only for DB events with source='db') */}
                  {event.source === 'db' && (
                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                      {rsvpStatus[event.id] ? (
                        <>
                          <span className="text-green-600 text-sm font-medium">✓ You are attending</span>
                          <button
                            type="button"
                            onClick={() => handleRSVP(event.id, false)}
                            disabled={loading === event.id}
                            className="text-sm text-stone-500 underline hover:text-stone-700"
                          >
                            Cancel RSVP
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRSVP(event.id, true)}
                          disabled={loading === event.id}
                          className="btn-secondary text-sm px-3 py-1"
                        >
                          {loading === event.id ? 'Saving…' : 'RSVP — I will attend'}
                        </button>
                      )}

                      {/* ICS Download */}
                      <a
                        href={`/api/events/${event.id}/ics`}
                        className="text-sm text-navy-600 hover:text-navy-800 underline"
                      >
                        Add to Calendar
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Month View (simplified grid) */}
      {view === 'month' && (
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <p className="text-stone-500 text-sm mb-4">
            Month view — showing all events for the next 30 days:
          </p>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="flex gap-4 text-sm border-b border-stone-100 pb-2">
                <span className="text-stone-400 w-24 flex-shrink-0">
                  {formatDate(event.startAt, 'MMM d')}
                </span>
                <span className="text-navy-800 font-medium">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
