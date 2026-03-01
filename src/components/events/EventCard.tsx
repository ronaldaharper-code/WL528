import Link from 'next/link'
import { formatDate, formatTime } from '@/lib/utils'

interface EventCardProps {
  event: {
    _id: string
    title: string
    slug: { current: string }
    startAt: string
    endAt?: string
    location?: string
    address?: string
    imageUrl?: string
    imageAlt?: string
    seoDescription?: string
  }
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startAt)
  const day = formatDate(event.startAt, 'd')
  const month = formatDate(event.startAt, 'MMM')
  const time = formatTime(event.startAt)
  const slug = typeof event.slug === 'string' ? event.slug : event.slug?.current

  return (
    <article className="card group">
      {/* Date badge + image header */}
      <div className="relative h-40 bg-navy-800 flex items-end">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.imageAlt ?? event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        )}

        {/* Date pill */}
        <div className="relative z-10 m-3 bg-white rounded text-center px-3 py-2 shadow-lg min-w-[48px]">
          <div className="text-gold-600 text-xs font-bold uppercase tracking-wide">{month}</div>
          <div className="text-navy-900 text-2xl font-bold leading-none">{day}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-navy-800 mb-1 group-hover:text-navy-600 transition-colors">
          <Link href={`/events/${slug}`} className="stretched-link">
            {event.title}
          </Link>
        </h3>

        <div className="flex items-center gap-1 text-stone-500 text-sm mb-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <time dateTime={event.startAt}>{time}</time>
        </div>

        {event.location && (
          <div className="flex items-center gap-1 text-stone-500 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        )}

        {event.seoDescription && (
          <p className="mt-3 text-stone-600 text-sm leading-relaxed line-clamp-2">
            {event.seoDescription}
          </p>
        )}
      </div>
    </article>
  )
}
