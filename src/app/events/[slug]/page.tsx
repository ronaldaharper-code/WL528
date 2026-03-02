// src/app/events/[slug]/page.tsx
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { sanityClient, QUERIES } from '@/lib/sanity'

interface PageProps {
  params: { slug: string }
}

async function getEvent(slug: string) {
  try {
    return await sanityClient.fetch(QUERIES.eventBySlug(slug))
  } catch {
    return null
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await getEvent(params.slug)

  if (!event) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="heading-lg mb-4">{event.title}</h1>

      <div className="text-stone-600 text-sm mb-8">
        {event.startAt ? (
          <div>
            <span className="font-semibold">Start:</span> {new Date(event.startAt).toLocaleString()}
          </div>
        ) : null}
        {event.endAt ? (
          <div>
            <span className="font-semibold">End:</span> {new Date(event.endAt).toLocaleString()}
          </div>
        ) : null}
        {event.location ? (
          <div>
            <span className="font-semibold">Location:</span> {event.location}
          </div>
        ) : null}
      </div>

      {event.description ? (
        <div className="prose prose-stone max-w-none">
          {/* if your description is portable text elsewhere, swap this to your renderer */}
          <p>{event.description}</p>
        </div>
      ) : null}
    </div>
  )
}