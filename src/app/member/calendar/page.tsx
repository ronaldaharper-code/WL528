import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Member Calendar',
  robots: { index: false },
}

const MEMBER_CALENDAR_URL =
  'https://calendar.google.com/calendar/embed?src=181fcb41172eb217e13e8d7d621c7ef8ac08f142e70b95404f92073e2c7cfeba%40group.calendar.google.com&ctz=America%2FDetroit&showTitle=0&showPrint=0&showTabs=0&showCalendars=0'

export default function MemberCalendarPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Lodge Calendar</h1>
        <p className="text-stone-500 text-sm mt-1">
          All lodge meetings, degree nights, and member events.
        </p>
      </header>

      <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-white">
        <iframe
          src={MEMBER_CALENDAR_URL}
          className="w-full"
          style={{ height: '700px', border: 0 }}
          title="Walled Lake Lodge #528 Member Calendar"
          loading="lazy"
        />
      </div>
    </div>
  )
}
