import type { Metadata } from 'next'
import { sanityClient, QUERIES, urlFor } from '@/lib/sanity'
import { HallRentalForm } from '@/components/HallRentalForm'
import { PortableText } from '@portabletext/react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Hall Rental',
  description:
    'Rent the Walled Lake Lodge #528 hall for your private event. Capacity of 125 guests in Walled Lake, Michigan. Inquire about availability.',
}

const hallSchema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Walled Lake Lodge #528 Hall',
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: siteConfig.address.country,
  },
  maximumAttendeeCapacity: 125,
}

async function getHallContent() {
  try {
    return await sanityClient.fetch(QUERIES.hallRental)
  } catch {
    return null
  }
}

export default async function HallRentalPage() {
  const content = await getHallContent()

  const amenities: string[] = content?.amenities ?? [
    'Seating for up to 125 guests',
    'Fully equipped kitchen',
    'Tables and chairs included',
    'Ample parking',
    'Accessible entrances',
    'Air conditioning and heat',
    'Audio/visual equipment available',
    'Outdoor space available',
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hallSchema) }}
      />

      {/* Hero */}
      <div className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Available for Private Events
          </p>
          <h1 className="font-serif text-4xl font-bold mb-4">Hall Rental</h1>
          <p className="text-xl text-stone-300 max-w-2xl">
            Our hall is a spacious and affordable venue for family gatherings, celebrations,
            and community events — accommodating up to 125 guests.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Gallery */}
            {content?.gallery?.length > 0 && (
              <section aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
                  The Hall
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {content.gallery.map((photo: any, i: number) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={urlFor(photo).width(400).height(300).fit('crop').url()}
                      alt={photo.alt ?? `Hall photo ${i + 1}`}
                      className="rounded aspect-video object-cover w-full"
                      loading="lazy"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Amenities */}
            <section aria-labelledby="amenities-heading">
              <h2 id="amenities-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
                Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-stone-700">
                    <span className="text-gold-500 flex-shrink-0" aria-hidden="true">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Rates & Policies from CMS */}
            {content?.rentalRates && (
              <section aria-labelledby="rates-heading">
                <h2 id="rates-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
                  Rental Rates
                </h2>
                <div className="prose-mason">
                  <PortableText value={content.rentalRates} />
                </div>
              </section>
            )}

            {content?.policies && (
              <section aria-labelledby="policies-heading">
                <h2 id="policies-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
                  Policies
                </h2>
                <div className="prose-mason">
                  <PortableText value={content.policies} />
                </div>
              </section>
            )}

            {/* Map */}
            <section aria-labelledby="location-heading">
              <h2 id="location-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
                Location
              </h2>
              <div className="rounded-lg overflow-hidden border border-stone-200 aspect-video">
                <iframe
                  title="Walled Lake Lodge #528 map"
                  src={siteConfig.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <address className="mt-3 text-stone-600 text-sm not-italic">
                {siteConfig.address.full}
              </address>
            </section>
          </div>

          {/* Inquiry Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
                <h2 className="font-serif text-xl font-bold text-navy-800 mb-1">
                  Request Information
                </h2>
                <p className="text-stone-500 text-sm mb-6">
                  Tell us about your event and we&rsquo;ll be in touch.
                </p>
                <HallRentalForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
