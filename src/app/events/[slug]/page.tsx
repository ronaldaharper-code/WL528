import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { formatDateTime } from '@/lib/utils'
import { PortableText } from '@portabletext/react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await sanityClient.fetch(QUERIES.eventBySlug(slug))
  if (!event) return { title: 'Event Not Found' }

  return {
    title: event.title,
    description: event.seoDescription ?? `${event.title} — Walled Lake Lodge #528`,
    openGraph: {
      title: event.title,
      description: event.seoDescription,
      images: event.imageUrl ? [{ url: event.imageUrl }] : [],
    },
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params
  const event = await sanityClient.fetch(QUERIES.eventBySlug(slug))
  if (!event) notFound()

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startAt,
    endDate: event.endAt,
    location: {
      '@type': 'Place',
      name: event.location ?? 'Walled Lake Lodge #528',
      address: event.address ?? '1499 N Pontiac Trail, Walled Lake, MI 48390',
    },
    description: event.seoDescription,
    organizer: {
      '@type': 'Organization',
      name: 'Walled Lake Lodge #528 F&AM',
      url: 'https://www.walledlakemasons.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-stone-500">
            <li><Link href="/events" className="hover:text-navy-700">Events</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-700 font-medium truncate">{event.title}</li>
          </ol>
        </nav>

        {event.imageUrl && (
          <div className="rounded-lg overflow-hidden mb-8 aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.imageUrl}
              alt={event.imageAlt ?? event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
            {event.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 text-stone-600 text-sm">
            {event.startAt && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
                </svg>
                <time dateTime={event.startAt}>{formatDateTime(event.startAt)}</time>
                {event.endAt && <span>– {formatDateTime(event.endAt)}</span>}
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </header>

        {event.description && (
          <div className="prose-mason mb-8">
            <PortableText value={event.description} />
          </div>
        )}

        {/* ICS download */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-stone-200">
          <a
            href={`/api/events/${event._id}/ics`}
            className="btn-secondary text-sm"
          >
            Add to Calendar (.ics)
          </a>
          <Link href="/events" className="btn-ghost text-sm">
            ← Back to Events
          </Link>
        </div>
      </div>
    </>
  )
}
