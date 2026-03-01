import type { Metadata } from 'next'
import { DonationForm } from '@/components/donations/DonationForm'

export const metadata: Metadata = {
  title: 'Donate — Support Walled Lake Lodge #528',
  description:
    'Support Walled Lake Lodge #528 through a charitable donation. Your contribution helps fund community work and lodge operations.',
}

export default function DonatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Support the Lodge
        </p>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">
          Make a Donation
        </h1>
        <p className="text-xl text-stone-600 leading-relaxed max-w-2xl">
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
            {[
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
                body: 'Funds help support Masonic education and degree work that enriches our members\' experience.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-gold-500 flex-shrink-0 mt-1" aria-hidden="true">◆</span>
                <div>
                  <p className="font-medium text-navy-800">{item.title}</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="mt-8 border-l-4 border-gold-400 pl-4 text-stone-600 italic">
            <p>
              Freemasonry has always considered charitable relief among its highest obligations —
              to brethren, their families, and the wider community alike.
            </p>
          </blockquote>
        </div>

        {/* Right: Donation form */}
        <div>
          <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
            <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
              Contribute
            </h2>
            <DonationForm />
          </div>

          <p className="text-stone-500 text-xs mt-4 text-center">
            Payments processed securely via Stripe. Walled Lake Lodge #528 is a nonprofit
            fraternal organization. Please consult a tax advisor regarding deductibility.
          </p>
        </div>
      </div>
    </div>
  )
}
