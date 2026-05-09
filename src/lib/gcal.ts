import { fromZonedTime } from 'date-fns-tz'

const MEMBER_CAL_ID =
  '181fcb41172eb217e13e8d7d621c7ef8ac08f142e70b95404f92073e2c7cfeba@group.calendar.google.com'

const ICAL_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(MEMBER_CAL_ID)}/public/basic.ics`

const LODGE_TZ = 'America/Detroit'

export interface CalEvent {
  title: string
  startAt: Date
  endAt?: Date
  location?: string
  allDay: boolean
}

// RFC 5545 line unfolding: CRLF + whitespace = continuation
function unfold(raw: string): string {
  return raw.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '')
}

function parseICalDate(value: string, params: string): Date {
  const isAllDay = params.includes('VALUE=DATE') || value.length === 8
  if (isAllDay) {
    return new Date(
      Number(value.slice(0, 4)),
      Number(value.slice(4, 6)) - 1,
      Number(value.slice(6, 8)),
    )
  }
  // UTC Z suffix
  if (value.endsWith('Z')) {
    return new Date(
      `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T` +
      `${value.slice(9, 11)}:${value.slice(11, 13)}:${value.slice(13, 15)}Z`,
    )
  }
  // TZID-aware or floating — convert from the specified (or lodge) timezone to UTC
  const tzidMatch = params.match(/TZID=([^;]+)/)
  const tz = tzidMatch ? tzidMatch[1] : LODGE_TZ
  const dateStr =
    `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T` +
    `${value.slice(9, 11)}:${value.slice(11, 13)}:${value.slice(13, 15)}`
  return fromZonedTime(dateStr, tz)
}

function parseIcal(text: string): CalEvent[] {
  const events: CalEvent[] = []
  const lines = unfold(text).split(/\r?\n/)

  let inEvent = false
  let cur: Partial<CalEvent> & { dtstart?: string; dtend?: string; dtparams?: string } = {}

  for (const raw of lines) {
    if (raw === 'BEGIN:VEVENT') { inEvent = true; cur = {}; continue }
    if (raw === 'END:VEVENT') {
      if (inEvent && cur.title && cur.dtstart) {
        const allDay = !cur.dtstart.includes('T')
        const startAt = parseICalDate(cur.dtstart, cur.dtparams ?? '')
        const endAt   = cur.dtend ? parseICalDate(cur.dtend, cur.dtparams ?? '') : undefined
        events.push({ title: cur.title, startAt, endAt, location: cur.location, allDay })
      }
      inEvent = false
      continue
    }
    if (!inEvent) continue

    const colon = raw.indexOf(':')
    if (colon === -1) continue
    const keyFull = raw.slice(0, colon)
    const val     = raw.slice(colon + 1).replace(/\\,/g, ',').replace(/\\n/g, '\n').trim()
    const [key, ...paramParts] = keyFull.split(';')
    const params = paramParts.join(';')

    if (key === 'SUMMARY')        cur.title    = val
    if (key === 'LOCATION')       cur.location = val
    if (key === 'DTSTART')        { cur.dtstart = val; cur.dtparams = params }
    if (key === 'DTEND')          cur.dtend    = val
  }

  return events
}

export async function fetchMemberCalendarEvents(): Promise<CalEvent[]> {
  try {
    const res = await fetch(ICAL_URL, { cache: 'no-store' })
    if (!res.ok) return []
    const text = await res.text()
    return parseIcal(text)
  } catch {
    return []
  }
}

export function getNext30DaysEvents(events: CalEvent[]): CalEvent[] {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // today at midnight
  const end   = new Date(start)
  end.setDate(end.getDate() + 30)
  return events
    .filter(e => e.startAt >= start && e.startAt <= end)
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
}
