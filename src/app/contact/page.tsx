import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Contact Walled Lake Lodge #528 F&AM with questions about Freemasonry, events, or hall rental. We're happy to respond.",
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Get in Touch
        </p>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">Contact Us</h1>
        <p className="text-xl text-stone-600 max-w-2xl">
          We welcome questions about Freemasonry, our lodge, or community events.
          A lodge officer will respond within a few days.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Info sidebar */}
        <aside className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-semibold text-navy-800 mb-2">Lodge Address</h2>
            <address className="text-stone-600 text-sm not-italic leading-relaxed">
              Walled Lake Lodge #528 F&amp;AM<br />
              {siteConfig.address.street}<br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </address>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 mb-2">Email</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-navy-700 text-sm hover:text-navy-900 underline"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 mb-2">Response Time</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We are a volunteer organization. We do our best to respond to all
              inquiries within 2&ndash;3 business days.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 mb-2">Grand Lodge</h2>
            <p className="text-stone-600 text-sm mb-2">
              For statewide Masonic information, visit the Grand Lodge of Michigan:
            </p>
            <a
              href="https://michiganmasons.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-700 text-sm hover:text-navy-900 underline"
            >
              michiganmasons.org ↗
            </a>
          </div>

          <div className="bg-navy-50 rounded-lg p-6 border border-navy-100">
            <p className="text-navy-800 font-semibold italic text-sm mb-1">
              &ldquo;To be one, ask one.&rdquo;
            </p>
            <p className="text-stone-600 text-sm">
              Freemasonry does not recruit. If you are interested in membership,
              please speak with a Mason you know.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
