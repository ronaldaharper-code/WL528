'use client'

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
      <div className="flex items-center gap-1 mb-8 bg-stone-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            view === 'list' ? 'bg-white text-navy-800 shadow-sm' : 'text-stone-500'
          }`}
        >
          List
        </button>

        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            view === 'calendar' ? 'bg-white text-navy-800 shadow-sm' : 'text-stone-500'
          }`}
        >
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