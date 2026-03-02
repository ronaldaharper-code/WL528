'use client'

import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { sanityClient, QUERIES } from '@/lib/sanity'
import Link from 'next/link'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    sanityClient.fetch(QUERIES.publicEvents).then(setEvents)
  }, [])

  const eventsForDay = selectedDate
    ? events.filter(e =>
        new Date(e.startAt).toDateString() ===
        selectedDate.toDateString()
      )
    : []

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Community Calendar</h1>

      <Calendar onClickDay={setSelectedDate} />

      {selectedDate && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Events on {selectedDate.toDateString()}
          </h2>

          {eventsForDay.length === 0 && (
            <p>No events scheduled.</p>
          )}

          {eventsForDay.map(event => (
            <div key={event._id} className="mb-3">
              <Link
                href={`/events/${event.slug?.current}`}
                className="text-blue-600 underline"
              >
                {event.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}