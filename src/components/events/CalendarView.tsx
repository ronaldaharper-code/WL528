'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameDay, isSameMonth,
  addMonths, subMonths, format, isToday,
} from 'date-fns'

interface CalendarEvent {
  _id: string
  title: string
  slug: { current: string }
  startAt: string
  location?: string
}

interface CalendarViewProps {
  events: CalendarEvent[]
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarView({ events }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd   = endOfMonth(currentMonth)
  const calStart   = startOfWeek(monthStart)
  const calEnd     = endOfWeek(monthEnd)
  const days       = eachDayOfInterval({ start: calStart, end: calEnd })

  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(new Date(e.startAt), day))

  const today = new Date()

  return (
    <div className="card overflow-hidden">
      {/* Month navigation header */}
      <div className="flex items-center justify-between px-5 py-4 bg-navy-800 text-white">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          aria-label="Previous month"
          className="w-9 h-9 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <p className="font-serif font-bold text-lg leading-none">
            {format(currentMonth, 'MMMM yyyy')}
          </p>
        </div>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          aria-label="Next month"
          className="w-9 h-9 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-200">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-stone-500 uppercase tracking-wide py-2.5"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 divide-x divide-y divide-stone-100">
        {days.map((day) => {
          const dayEvents     = getEventsForDay(day)
          const inMonth       = isSameMonth(day, currentMonth)
          const todayMark     = isToday(day)

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[90px] p-1.5 sm:p-2 relative ${
                inMonth ? 'bg-white' : 'bg-stone-50/60'
              }`}
            >
              {/* Day number */}
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold mb-1 ${
                  todayMark
                    ? 'bg-navy-700 text-white'
                    : inMonth
                      ? 'text-stone-700'
                      : 'text-stone-300'
                }`}
              >
                {format(day, 'd')}
              </span>

              {/* Events */}
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((e) => {
                  const slug = typeof e.slug === 'string' ? e.slug : e.slug?.current
                  return (
                    <Link
                      key={e._id}
                      href={`/events/${slug}`}
                      className="block text-[10px] sm:text-xs font-medium rounded px-1 py-0.5 bg-navy-100 text-navy-800 hover:bg-navy-200 transition-colors truncate leading-tight"
                      title={e.title}
                    >
                      {e.title}
                    </Link>
                  )
                })}
                {dayEvents.length > 3 && (
                  <p className="text-[10px] text-stone-400 pl-1">
                    +{dayEvents.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 flex items-center gap-3 text-xs text-stone-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-navy-700 flex-shrink-0" />
          Today
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-navy-100 flex-shrink-0" />
          Event
        </span>
      </div>
    </div>
  )
}
