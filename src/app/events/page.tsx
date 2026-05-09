import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Upcoming public events at Walled Lake Lodge #528 — open to the community in Walled Lake, Michigan.',
}

const CALENDAR_EMBED_URL =
  'https://calendar.google.com/calendar/embed?src=walledlakemasons528%40gmail.com&ctz=America%2FDetroit&showTitle=0&showPrint=0&showTabs=0&showCalendars=0'

export default function EventsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <p className="eyebrow mb-3">Community Calendar</p>
        <h1 className="heading-lg mb-4">Upcoming Events</h1>
        <p className="lead max-w-2xl">
          Public events open to the community hosted at or by {siteConfig.name}.
        </p>
        <p className="mt-2 text-stone-500 text-sm">
          Lodge members:{' '}
          <Link href="/auth/signin" className="text-navy-700 underline">
            log in
          </Link>{' '}
          to view the full member calendar including stated meetings.
        </p>
      </header>

      <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-white">
        <iframe
          src={CALENDAR_EMBED_URL}
          className="w-full"
          style={{ height: '700px', border: 0 }}
          title="Walled Lake Lodge #528 Events Calendar"
          loading="lazy"
        />
      </div>

      <p className="mt-4 text-center text-sm text-stone-400">
        Events managed by{' '}
        <a
          href="https://calendar.google.com/calendar/r?cid=walledlakemasons528%40gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-600 hover:underline"
        >
          Walled Lake Lodge #528
        </a>
      </p>
    </div>
  )
}
