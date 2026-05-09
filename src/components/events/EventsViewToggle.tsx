'use client'
import { EventCard } from './EventCard'

interface EventsViewToggleProps {
  events: any[]
}

export function EventsViewToggle({ events }: EventsViewToggleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event: any) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  )
}