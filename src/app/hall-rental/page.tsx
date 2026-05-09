export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { HallRentalForm } from '@/components/HallRentalForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Hall Rental | ${siteConfig.name}`,
  description: 'Request information about renting the lodge hall.',
}

export default async function HallRentalPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="max-w-3xl mb-12">
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">Hall Rental</h1>

        <p className="text-stone-600 leading-relaxed mb-8">
          At Walled Lake Masonic Lodge No. 528, our hall is available for private
          rentals and community events.
        </p>

        <section className="mb-8">
          <p className="text-stone-600 leading-relaxed mb-4">
            Our spacious hall accommodates up to approximately 125 guests and is ideal
            for graduation parties, birthday celebrations, retirement parties, baby or bridal
            showers, family gatherings, business meetings, and community events.
          </p>
          <p className="text-stone-600 leading-relaxed mb-6">
            The hall offers a clean, flexible open layout with tables and chairs included, allowing
            the space to be configured for a variety of event styles and group sizes.
          </p>

          <h3 className="font-semibold text-navy-800 mb-3">Features include:</h3>
          <ul className="space-y-2 mb-6">
            {[
              'Seating for up to 125 guests',
              'Tables and chairs included',
              'Flexible room layout',
              'Optional kitchen access for approved events',
              'Convenient downtown Walled Lake location',
              'On-site parking',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-stone-600">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <p className="text-stone-600 leading-relaxed">
            The hall combines historic character with a welcoming atmosphere, making it
            a unique and affordable venue for both casual and formal gatherings.
          </p>
        </section>

        <div className="border-t border-stone-200 pt-8">
          <p className="text-stone-600 mb-8">
            Fill out the form below and we'll get back to you with availability and details.
          </p>
        </div>
      </div>

      <HallRentalForm />
    </div>
  )
}