export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { sanityClient, QUERIES } from '@/lib/sanity'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function EventPage({ params }: PageProps) {
  const event = await sanityClient.fetch(
    QUERIES.eventBySlug,
    { slug: params.slug }
  )

  if (!event) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

      {event.startAt && (
        <p className="text-gray-600 mb-2">
          {new Date(event.startAt).toLocaleString()}
        </p>
      )}

      {event.location && (
        <p className="text-gray-600 mb-6">
          {event.location}
        </p>
      )}

      {event.seoDescription && (
        <p className="text-lg leading-relaxed">
          {event.seoDescription}
        </p>
      )}
    </div>
  )
}