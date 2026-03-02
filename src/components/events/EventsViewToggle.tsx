'use client'

import 'react-calendar/dist/Calendar.css'

import { useState } from 'react'
import { EventCard } from './EventCard'
import { CalendarView } from './CalendarView'

type View = 'list' | 'calendar'

interface EventsViewToggleProps {
  events: any[]
}

export function EventsViewToggle({ events }: EventsViewToggleProps) {
  const [view, setView] = useState<View>('list')

  return (
    <div>
      {/* View switcher */}
      <div className="flex items-center gap-1 mb-8 bg-stone-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
            view === 'list'
              ? 'bg-white text-navy-800 shadow-sm'
              : 'text-stone-500 hover:text-stone-700'
          }`}
          aria-pressed={view === 'list'}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          List
        </button>

        <button
          onClick={() => setView('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
            view === 'calendar'
              ? 'bg-white text-navy-800 shadow-sm'
              : 'text-stone-500 hover:text-stone-700'
          }`}
          aria-pressed={view === 'calendar'}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          Calendar
        </button>
      </div>

      {view === 'calendar' ? (
        <div className="flex justify-center">
          <CalendarView events={events} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}