import type { Metadata } from 'next'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { EventCard } from '@/components/events/EventCard'

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
        name: e.location ?? 'Walled Lake Lodge #528',
        address: e.address ?? '1499 N Pontiac Trail, Walled Lake, MI 48390',
      },
      description: e.seoDescription,
      organizer: {
        '@type': 'Organization',
        name: 'Walled Lake Lodge #528 F&AM',
        url: 'https://www.walledlakemasons.com',
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
          <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Community Calendar
          </p>
          <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-stone-600 max-w-2xl">
            Public events open to the community hosted at or by Walled Lake Lodge #528.
          </p>
          <p className="mt-2 text-stone-500 text-sm">
            Lodge members: log in to view the full member calendar including stated meetings.
          </p>
        </header>

        {events.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="text-lg">No upcoming public events at this time.</p>
            <p className="text-sm mt-2">Check back soon, or{' '}
              <a href="/contact" className="text-navy-700 underline">contact the lodge</a>{' '}
              for meeting information.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
