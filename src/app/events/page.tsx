export const dynamic = 'force-dynamic'

import { sanityClient, QUERIES } from '@/lib/sanity'
import { EventsViewToggle } from '@/components/events/EventsViewToggle'

export default async function EventsPage() {
  let events: any[] = []

  try {
    events = await sanityClient.fetch(QUERIES.publicEvents)
  } catch {
    events = []
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <EventsViewToggle events={events} />
    </div>
  )
}