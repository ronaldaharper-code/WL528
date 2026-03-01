import type { Metadata } from 'next'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { siteConfig } from '@/config/site'
import { EventsViewToggle } from '@/components/events/EventsViewToggle'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Upcoming public events at Walled Lake Lodge #528 — open to the community in Walled Lake, Michigan.',
}

const eventSchema = (events: any[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: events.map((e, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Event',
      name: e.title,
      startDate: e.startAt,
      endDate: e.endAt,
      location: {
        '@type': 'Place',
        name: e.location ?? siteConfig.name,
        address: e.address ?? siteConfig.address.full,
      },
      description: e.seoDescription,
      organizer: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  })),
})

async function getEvents() {
  try {
    return await sanityClient.fetch(QUERIES.publicEvents)
  } catch {
    return []
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(events)) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-10">
          <p className="eyebrow mb-3">Community Calendar</p>
          <h1 className="heading-lg mb-4">Upcoming Events</h1>
          <p className="lead max-w-2xl">
            Public events open to the community hosted at or by Walled Lake Lodge #528.
          </p>
          <p className="mt-2 text-stone-500 text-sm">
            Lodge members:{' '}
            <a href="/auth/signin" className="text-navy-700 underline">log in</a>{' '}
            to view the full member calendar including stated meetings.
          </p>
        </header>

        {events.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="font-serif text-lg font-semibold text-navy-800 mb-2">
              No upcoming public events
            </p>
            <p className="text-stone-500 text-sm">
              Check back soon, or{' '}
              <a href="/contact" className="text-navy-700 underline">contact the lodge</a>{' '}
              for meeting information.
            </p>
          </div>
        ) : (
          <EventsViewToggle events={events} />
        )}
      </div>
    </>
  )
}
