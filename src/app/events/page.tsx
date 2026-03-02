import { sanityClient, QUERIES } from '@/lib/sanity'
import { EventsViewToggle } from '@/components/events/EventsViewToggle'

export default async function EventsPage() {
  const events = await sanityClient.fetch(QUERIES.publicEvents)

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <EventsViewToggle events={events} />
    </div>
  )
}