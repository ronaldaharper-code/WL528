/**
 * Generate an ICS calendar file for a single event.
 */
export function generateICS(event: {
  uid: string
  title: string
  startAt: Date
  endAt?: Date | null
  location?: string | null
  description?: string | null
}): string {
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Walled Lake Lodge #528//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}@walledlakemasons.com`,
    `SUMMARY:${event.title}`,
    `DTSTART:${fmt(event.startAt)}`,
    event.endAt ? `DTEND:${fmt(event.endAt)}` : '',
    event.location ? `LOCATION:${event.location}` : '',
    event.description
      ? `DESCRIPTION:${event.description.replace(/\n/g, '\\n').slice(0, 500)}`
      : '',
    `DTSTAMP:${fmt(new Date())}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  return lines
}
