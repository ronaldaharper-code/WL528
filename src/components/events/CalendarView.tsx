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
  slug: { current: string } | string
  startAt: string
  endAt?: string
  location?: string
}

interface CalendarViewProps {
  events: CalendarEvent[]
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getSlug(slug: CalendarEvent['slug']): string {
  return typeof slug === 'string' ? slug : slug?.current ?? ''
}

export function CalendarView({ events }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd   = endOfMonth(currentMonth)
  const calStart   = startOfWeek(monthStart)
  const calEnd     = endOfWeek(monthEnd)
  const days       = eachDayOfInterval({ start: calStart, end: calEnd })

  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(new Date(e.startAt), day))

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : []

  function handleDayClick(day: Date, inMonth: boolean) {
    if (!inMonth) return
    setSelectedDay((prev) => (prev && isSameDay(prev, day) ? null : day))
  }

  function handleMonthChange(dir: 1 | -1) {
    setSelectedDay(null)
    setCurrentMonth((m) => (dir === 1 ? addMonths(m, 1) : subMonths(m, 1)))
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
        <button
          onClick={() => handleMonthChange(-1)}
          aria-label="Previous month"
          className="w-8 h-8 rounded-full hover:bg-stone-100 transition-colors flex items-center justify-center text-stone-500 hover:text-stone-800"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <p className="font-semibold text-stone-800 text-base">
          {format(currentMonth, 'MMMM yyyy')}
        </p>

        <button
          onClick={() => handleMonthChange(1)}
          aria-label="Next month"
          className="w-8 h-8 rounded-full hover:bg-stone-100 transition-colors flex items-center justify-center text-stone-500 hover:text-stone-800"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 px-2 pt-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-stone-400 pb-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 px-2 pb-2 gap-y-1">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          const inMonth   = isSameMonth(day, currentMonth)
          const todayMark = isToday(day)
          const selected  = selectedDay ? isSameDay(day, selectedDay) : false
          const hasEvents = dayEvents.length > 0 && inMonth

          return (
            <div key={day.toISOString()} className="flex flex-col items-center gap-0.5 py-0.5">
              <button
                onClick={() => handleDayClick(day, inMonth)}
                disabled={!inMonth}
                aria-label={format(day, 'MMMM d, yyyy')}
                aria-pressed={selected}
                className={`
                  w-8 h-8 rounded-full text-sm font-medium transition-colors
                  flex items-center justify-center
                  ${!inMonth ? 'text-stone-200 cursor-default' : ''}
                  ${inMonth && !todayMark && !selected ? 'text-stone-700 hover:bg-stone-100' : ''}
                  ${todayMark && !selected ? 'bg-blue-600 text-white' : ''}
                  ${selected ? 'bg-navy-800 text-white' : ''}
                `}
              >
                {format(day, 'd')}
              </button>

              {/* Event dots */}
              {hasEvents && (
                <div className="flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e._id}
                      className={`w-1 h-1 rounded-full ${selected ? 'bg-white/60' : 'bg-navy-600'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Day events panel */}
      {selectedDay && (
        <div className="border-t border-stone-100 px-4 py-3">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            {format(selectedDay, 'EEEE, MMMM d')}
          </p>

          {selectedDayEvents.length === 0 ? (
            <p className="text-sm text-stone-400">No events this day.</p>
          ) : (
            <ul className="space-y-1">
              {selectedDayEvents.map((e) => (
                <li key={e._id}>
                  <Link
                    href={`/events/${getSlug(e.slug)}`}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-stone-50 transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-800 group-hover:text-navy-800 truncate">
                        {e.title}
                      </p>
                      <p className="text-xs text-stone-400">
                        {format(new Date(e.startAt), 'h:mm a')}
                        {e.location && ` · ${e.location}`}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-stone-300 group-hover:text-navy-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
