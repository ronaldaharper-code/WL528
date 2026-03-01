import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { EventCard } from '@/components/events/EventCard'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Walled Lake Lodge #528 F&AM — Freemasonry in Walled Lake, Michigan',
  description: siteConfig.description,
}

const PILLARS = [
  {
    title: 'Brotherly Love',
    body: 'Every Mason regards the whole human race as one family. We cultivate genuine friendship, charity, and compassion — not as duties, but as the natural expression of a well-formed character.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    title: 'Relief',
    body: 'We support our brethren, their families, and our wider community through charitable service. Freemasonry has always considered charitable relief among its highest obligations.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'Truth',
    body: 'We pursue knowledge, uphold integrity in all dealings, and challenge every member to become a better version of himself — in his family, his community, and his character.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
]

async function getUpcomingPublicEvents() {
  try {
    return await sanityClient.fetch(QUERIES.publicEvents)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const events = await getUpcomingPublicEvents()

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO — deep navy, typographic, dignified
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Welcome to Walled Lake Lodge #528" className="relative overflow-hidden bg-hero text-white">
        {/* Subtle diagonal grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 80L80 0M-20 20L20 -20M60 100L100 60' stroke='%23c9891f' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800/20 via-transparent to-navy-950/60" aria-hidden="true" />

        {/* Gold left accent bar */}
        <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-gold-500/0 via-gold-500 to-gold-500/0" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 xl:py-40">
          <div className="max-w-3xl">
            <span className="eyebrow mb-5 block text-gold-400">
              Est. {siteConfig.established} &bull; Oakland County, Michigan
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Walled Lake<br />
              Lodge{' '}
              <span className="text-gold-400">#528</span>
            </h1>

            <p className="text-2xl text-stone-300/90 font-light leading-relaxed mb-4 max-w-2xl">
              Free &amp; Accepted Masons
            </p>

            <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-xl">
              A fraternal brotherhood dedicated to Brotherly Love, Relief, and Truth —
              serving the Walled Lake community for over seventy-five years.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/about-freemasonry" className="btn btn-gold btn-lg">
                Learn About Freemasonry
              </Link>
              <Link href="/events" className="btn btn-outline btn-lg">
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          THREE PILLARS
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="pillars-heading" className="section bg-stone-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow mb-3 block">Our Principles</span>
            <h2 id="pillars-heading" className="heading-lg text-balance">
              The Three Tenets of Freemasonry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl border border-stone-200/80 p-8 text-center
                           shadow-card hover:shadow-card-md hover:-translate-y-0.5
                           transition-all duration-200"
              >
                <div
                  className="w-14 h-14 rounded-2xl bg-navy-50 border border-navy-100
                             flex items-center justify-center mx-auto mb-5 text-navy-600"
                >
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT + QUOTE
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="about-heading" className="section bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

            {/* Text column */}
            <div className="lg:col-span-3">
              <span className="eyebrow mb-3 block">Walled Lake, Michigan</span>
              <h2 id="about-heading" className="heading-lg mb-5">
                A Lodge Rooted in Tradition
              </h2>
              <p className="lead mb-5">
                Walled Lake Lodge #528 was chartered under the Grand Lodge of Michigan,
                Free and Accepted Masons, and has served Oakland County since 1949.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                We meet regularly throughout the year to conduct lodge business, confer
                Masonic degrees, and build lasting bonds of brotherhood. Our membership
                includes men from all walks of life — united by shared values and a
                commitment to making themselves and their communities better.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                The lodge is open to men of good character who believe in a Supreme Being.
                We do not recruit members — Freemasonry must be approached freely.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about-lodge" className="btn btn-primary">
                  About the Lodge
                </Link>
                <Link href="/how-to-join" className="btn btn-secondary">
                  How to Join
                </Link>
              </div>
            </div>

            {/* Quote card */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 lg:p-10 text-white overflow-hidden">
                {/* decorative quotation mark */}
                <div className="absolute top-4 right-6 font-serif text-8xl text-white/5 leading-none select-none" aria-hidden="true">
                  &ldquo;
                </div>

                <blockquote className="relative">
                  <p className="font-serif text-2xl italic leading-relaxed text-white mb-5">
                    &ldquo;Freemasonry makes good men better.&rdquo;
                  </p>
                  <footer className="text-gold-400 text-sm font-semibold tracking-wide uppercase">
                    Masonic Tradition
                  </footer>
                </blockquote>

                <div className="mt-7 pt-7 border-t border-white/10">
                  <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    Membership in Freemasonry is open to men of good character who
                    believe in a Supreme Being. We do not solicit membership.
                  </p>
                  <p className="font-serif italic text-gold-400 font-semibold">
                    &ldquo;To be one, ask one.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          UPCOMING PUBLIC EVENTS
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="events-heading" className="section bg-stone-50">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="eyebrow mb-2 block">Community Calendar</span>
              <h2 id="events-heading" className="heading-md">Upcoming Events</h2>
            </div>
            <Link
              href="/events"
              className="text-navy-700 hover:text-navy-900 text-sm font-semibold
                         flex items-center gap-1.5 transition-colors shrink-0"
            >
              View Full Calendar
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18" />
                </svg>
              </div>
              <p className="font-medium text-stone-700 mb-1">No upcoming public events</p>
              <p className="text-stone-400 text-sm">Check back soon, or contact the lodge for meeting information.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.slice(0, 3).map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HALL RENTAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="rental-heading" className="section bg-white">
        <div className="container-wide">
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-lg">
                <span className="eyebrow mb-2 block">Available for Private Events</span>
                <h2 id="rental-heading" className="heading-md mb-3">Hall Rental</h2>
                <p className="text-stone-600 leading-relaxed">
                  Our banquet hall seats up to{' '}
                  <strong className="text-stone-800">125 guests</strong> and is available
                  for private celebrations, community gatherings, meetings, and more.
                </p>
              </div>
              <Link href="/hall-rental" className="btn btn-primary btn-lg shrink-0">
                Inquire About Rental
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DONATE CTA
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="donate-heading" className="section bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 80L80 0M-20 20L20 -20M60 100L100 60' stroke='%23c9891f' stroke-width='1'/%3E%3C/svg%3E")` }} aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow mb-4 block text-gold-400">Support Our Work</span>
          <h2 id="donate-heading" className="heading-lg text-white mb-5">
            Support the Lodge
          </h2>
          <p className="lead text-stone-300 mb-10 max-w-xl mx-auto">
            Your contribution supports lodge operations, community charitable works,
            and the preservation of our meeting place for future generations.
          </p>
          <Link href="/donate" className="btn btn-gold btn-lg">
            Make a Donation
          </Link>
        </div>
      </section>
    </>
  )
}
