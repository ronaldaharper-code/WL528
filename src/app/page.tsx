import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { EventCard } from '@/components/events/EventCard'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Walled Lake Lodge #528 F&AM — Freemasonry in Walled Lake, Michigan',
  description:
    'Walled Lake Lodge #528 Free and Accepted Masons serves the Walled Lake community with fellowship, charity, and Masonic tradition since 1949.',
}

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
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        aria-label="Welcome"
        className="relative bg-navy-900 text-white overflow-hidden"
        style={{ minHeight: 520 }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: "url('/hero-pattern.svg')", backgroundSize: '400px' }} />

        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Est. 1949 &middot; Oakland County, Michigan
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Walled Lake Lodge<br />
              <span className="text-gold-400">#528</span> F&amp;AM
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed mb-8">
              A fraternal organization dedicated to Brotherly Love, Relief, and Truth —
              serving the Walled Lake community for over seventy-five years.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about-freemasonry" className="btn-primary bg-gold-500 hover:bg-gold-600 text-navy-900">
                Learn About Freemasonry
              </Link>
              <Link href="/events" className="btn-secondary border-stone-400 text-stone-200 hover:bg-navy-800">
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION PILLARS
      ========================================================= */}
      <section aria-labelledby="pillars-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="pillars-heading" className="sr-only">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Brotherly Love',
                icon: '⚖',
                body: 'Every Mason regards the whole human race as one family. We practice charity, understanding, and compassion toward all.',
              },
              {
                title: 'Relief',
                icon: '✦',
                body: 'We support our brethren, their families, and our wider community through charitable works and personal service.',
              },
              {
                title: 'Truth',
                icon: '◆',
                body: 'We pursue knowledge, uphold integrity, and encourage every member to be the best version of himself.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="text-center px-6">
                <div className="text-4xl text-gold-500 mb-4" aria-hidden="true">{pillar.icon}</div>
                <h3 className="font-serif text-xl font-bold text-navy-800 mb-3">{pillar.title}</h3>
                <p className="text-stone-600 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT EXCERPT
      ========================================================= */}
      <section aria-labelledby="about-heading" className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="about-heading" className="section-heading">
                About Walled Lake Lodge #528
              </h2>
              <p className="section-subheading mb-4">
                Walled Lake Lodge #528 was chartered under the Grand Lodge of Michigan,
                Free and Accepted Masons, and has served Oakland County for generations.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                We meet regularly to conduct lodge business, celebrate Masonic degrees, and
                build lasting bonds of brotherhood. Our lodge is home to members from all
                walks of life, united by shared values and a commitment to self-improvement.
              </p>
              <Link href="/about-lodge" className="btn-primary">
                Learn More About the Lodge
              </Link>
            </div>

            {/* Quote callout */}
            <div className="bg-navy-800 text-stone-100 rounded-lg p-8 lg:p-10">
              <blockquote>
                <p className="font-serif text-2xl italic leading-relaxed text-stone-100 mb-6">
                  &ldquo;Freemasonry makes good men better.&rdquo;
                </p>
                <p className="text-gold-400 text-sm font-medium tracking-wide uppercase">
                  Masonic Tradition
                </p>
              </blockquote>
              <div className="mt-6 pt-6 border-t border-navy-700">
                <p className="text-stone-400 text-sm">
                  Membership in Freemasonry is open to men of good character who believe in
                  a Supreme Being. We do not solicit membership.
                </p>
                <p className="mt-3 text-gold-400 font-semibold italic">
                  &ldquo;To be one, ask one.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          UPCOMING PUBLIC EVENTS
      ========================================================= */}
      <section aria-labelledby="events-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 id="events-heading" className="section-heading mb-0">Upcoming Events</h2>
            <Link href="/events" className="text-navy-700 hover:text-navy-900 text-sm font-medium">
              View All Events →
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="text-stone-500 text-center py-12">
              No upcoming public events at this time. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 3).map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          HALL RENTAL CTA
      ========================================================= */}
      <section aria-labelledby="rental-heading" className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 id="rental-heading" className="section-heading">Hall Available for Rent</h2>
              <p className="section-subheading max-w-lg">
                Our hall accommodates up to 125 guests and is available for private events,
                celebrations, and community gatherings.
              </p>
            </div>
            <Link href="/hall-rental" className="btn-primary flex-shrink-0 text-base">
              Inquire About Rental
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          DONATE CTA
      ========================================================= */}
      <section aria-labelledby="donate-heading" className="py-16 bg-navy-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="donate-heading" className="font-serif text-3xl font-bold text-stone-100 mb-4">
            Support the Lodge
          </h2>
          <p className="text-stone-300 leading-relaxed mb-8">
            Your contribution supports lodge operations, community charitable works,
            and the preservation of our historic building.
          </p>
          <Link href="/donate" className="btn-primary bg-gold-500 hover:bg-gold-600 text-navy-900 text-base">
            Make a Donation
          </Link>
        </div>
      </section>
    </>
  )
}
