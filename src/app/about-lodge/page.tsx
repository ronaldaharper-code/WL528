import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'About Walled Lake Lodge #528',
  description:
    'Learn about Walled Lake Lodge #528 F&AM — our history, traditions, and community in Oakland County, Michigan since 1924.',
}

const OFFICERS = [
  { title: 'Worshipful Master', name: 'Contact Lodge for Current Officers' },
  { title: 'Senior Warden', name: '' },
  { title: 'Junior Warden', name: '' },
  { title: 'Treasurer', name: '' },
  { title: 'Secretary', name: '' },
]

export default function AboutLodgePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Walled Lake, Michigan
        </p>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">
          About Walled Lake Lodge #528
        </h1>
        <p className="text-xl text-stone-600 leading-relaxed max-w-2xl">
          Chartered under the Grand Lodge of Michigan, Free and Accepted Masons,
          Walled Lake Lodge #528 has served Oakland County since 1924.
        </p>
      </header>

      {/* History */}
      <section aria-labelledby="history-heading" className="mb-12">
        <h2 id="history-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
          Our History
        </h2>
        <div className="prose-mason">
          <p>
            Walled Lake Lodge #528 was established in 1924 under the jurisdiction of the
            Grand Lodge of Michigan, F&amp;AM. The lodge has grown alongside the communities
            it serves — welcoming men from Walled Lake, Commerce Township, Novi, Milford,
            and the broader Oakland and Livingston County area.
          </p>
          <p>
            In 2024, the lodge proudly marked its 100-year anniversary — a century of
            Brotherly Love, Relief, and Truth in service to Oakland County and the
            surrounding communities.
          </p>
          <p>
            Over more than one hundred years, the lodge has conferred hundreds of degrees,
            supported local families in need, contributed to community organizations, and
            maintained a place for men of good character to gather in fellowship.
          </p>
          <p>
            Today, Lodge #528 continues this tradition — working to make good men better
            and to serve the communities where our members live and work.
          </p>
        </div>
      </section>

      {/* Meeting Info */}
      <section aria-labelledby="meetings-heading" className="mb-12 bg-navy-50 rounded-lg p-8 border border-navy-100">
        <h2 id="meetings-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
          Meetings &amp; Location
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-navy-700 mb-2">Regular Stated Meetings</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              The lodge holds its stated meeting on the <strong>first Wednesday of each
              month</strong>. The lodge goes dark in <strong>July and August</strong>.
              Masonic visitors are always welcome with proper credentials.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-navy-700 mb-2">Location</h3>
            <address className="text-stone-600 text-sm not-italic leading-relaxed">
              Walled Lake Lodge #528<br />
              {siteConfig.address.street}<br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </address>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-navy-200">
          <p className="text-stone-500 text-sm">
            For specific meeting dates and times, please{' '}
            <Link href="/contact" className="text-navy-700 underline">contact the lodge secretary</Link>.
          </p>
        </div>
      </section>

      {/* Charitable Work */}
      <section aria-labelledby="charity-heading" className="mb-12">
        <h2 id="charity-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
          Community &amp; Charitable Work
        </h2>
        <div className="prose-mason">
          <p>
            Charitable relief is one of Freemasonry&rsquo;s oldest traditions. Walled Lake
            Lodge #528 supports causes both locally and through state and national Masonic
            charities, including the Michigan Masonic Home and the Michigan Masonic Charitable
            Foundation.
          </p>
          <p>
            Our members volunteer in local schools, food banks, and community organizations.
            We believe that a Mason&rsquo;s first charitable obligation is to the community
            in which he lives.
          </p>
        </div>
      </section>

      {/* Affiliation */}
      <section aria-labelledby="affiliation-heading" className="mb-12 bg-stone-50 rounded-lg p-8">
        <h2 id="affiliation-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
          Grand Lodge Affiliation
        </h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          Walled Lake Lodge #528 operates under the jurisdiction of the Grand Lodge of
          Michigan, Free and Accepted Masons. The Grand Lodge sets standards for lodges
          across the state and maintains fellowship with recognized Grand Lodges worldwide.
        </p>
        <a
          href="https://michiganmasons.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-navy-700 font-medium hover:text-navy-900"
        >
          Michigan Masons Grand Lodge ↗
        </a>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link href="/how-to-join" className="btn-primary">
          How to Join
        </Link>
        <Link href="/events" className="btn-secondary">
          Upcoming Events
        </Link>
        <Link href="/contact" className="btn-ghost">
          Contact the Lodge
        </Link>
      </div>
    </div>
  )
}
