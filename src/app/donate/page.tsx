import type { Metadata } from 'next'
import { DonationForm } from '@/components/donations/DonationForm'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Donate — Support Walled Lake Lodge #528',
  description:
    'Support Walled Lake Lodge #528 through a charitable donation. Your contribution helps fund community work and lodge operations.',
}

const DONATION_USES = [
  {
    title: 'Community Charitable Work',
    body: 'We contribute to local food banks, scholarship funds, and community organizations throughout the year.',
  },
  {
    title: 'Masonic Charities',
    body: 'Donations support Michigan Masonic charities including programs for children and seniors.',
  },
  {
    title: 'Lodge Building & Operations',
    body: 'Maintaining our lodge building ensures we can continue serving the community and hosting events.',
  },
  {
    title: 'Educational Programs',
    body: "Funds help support Masonic education and degree work that enriches our members' experience.",
  },
]

export default function DonatePage() {
  const donationsEnabled = siteConfig.features.donationsEnabled

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">Support the Lodge</p>
        <h1 className="heading-lg mb-4">Make a Donation</h1>
        <p className="lead max-w-2xl">
          Your generosity supports our lodge&rsquo;s charitable work, community programs,
          and the preservation of our historic building.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: What donations support */}
        <div>
          <h2 className="font-serif text-xl font-bold text-navy-800 mb-4">
            How Donations Help
          </h2>
          <div className="space-y-4">
            {DONATION_USES.map((item) => (
              <div key={item.title} className="flex gap-3">
                <svg className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L7 9.94 5.28 8.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z" />
                </svg>
                <div>
                  <p className="font-semibold text-navy-800">{item.title}</p>
                  <p className="text-stone-600 text-sm leading-relaxed mt-0.5">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="mt-8 border-l-4 border-gold-400 pl-5 text-stone-600 italic text-sm leading-relaxed">
            Freemasonry has always considered charitable relief among its highest obligations —
            to brethren, their families, and the wider community alike.
          </blockquote>
        </div>

        {/* Right: Donation form or Coming Soon */}
        <div>
          {donationsEnabled ? (
            <>
              <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-8">
                <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
                  Contribute
                </h2>
                <DonationForm />
              </div>
              <p className="text-stone-500 text-xs mt-4 text-center">
                Payments processed securely via Stripe. Walled Lake Lodge #528 is a nonprofit
                fraternal organization. Please consult a tax advisor regarding deductibility.
              </p>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-8 text-center">
              {/* Mail icon */}
              <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5H7.688C5.099 3.75 3 5.765 3 8.25v7.5C3 18.235 5.099 20.25 7.688 20.25h8.624C18.901 20.25 21 18.235 21 15.75V8.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8.25l7.688 5.25a.75.75 0 00.874 0L20.25 8.25" />
                </svg>
              </div>
              <h2 className="font-serif text-xl font-bold text-navy-800 mb-3">
                Online Donations Coming Soon
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                We are setting up secure online donations. In the meantime, you can
                support the lodge by contacting us directly — we accept checks payable
                to <strong>Walled Lake Lodge #528</strong>.
              </p>
              <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-700 mb-6">
                <p className="font-semibold text-navy-800 mb-1">Mail a Check</p>
                <address className="not-italic text-stone-600">
                  {siteConfig.address.multiLine[0]}<br />
                  {siteConfig.address.multiLine[1]}
                </address>
              </div>
              <Link href="/contact" className="btn-primary">
                Contact the Lodge
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
