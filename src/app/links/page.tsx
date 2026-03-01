import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Masonic Links & Resources',
  description:
    'Helpful links for Masonic resources, the Grand Lodge of Michigan, and related organizations.',
}

const LINK_GROUPS = [
  {
    category: 'Grand Lodge of Michigan',
    links: [
      { label: 'Michigan Masons', url: 'https://michiganmasons.org/', description: 'The Grand Lodge of Michigan, F&AM — the governing body for Michigan lodges.' },
      { label: 'Michigan Masonic Charitable Foundation', url: 'https://michiganmasons.org/charitable-foundation/', description: 'Supporting Michigan communities through Masonic philanthropy.' },
    ],
  },
  {
    category: 'Masonic Bodies & Appendant Orders',
    links: [
      { label: 'Scottish Rite — Valley of Detroit', url: 'https://www.scottishrite-detroit.org/', description: 'The Ancient Accepted Scottish Rite, Southern Jurisdiction.' },
      { label: 'York Rite — Michigan Grand Council', url: 'https://www.migrandcouncil.com/', description: 'Royal and Select Masters of Michigan.' },
      { label: 'Order of the Eastern Star — Michigan', url: 'https://www.michiganoes.com/', description: 'A Masonic-affiliated organization for men and women.' },
      { label: 'Shriners International', url: 'https://www.shrinersinternational.org/', description: 'Shriners Hospitals for Children and fraternal fellowship.' },
    ],
  },
  {
    category: 'Masonic Education',
    links: [
      { label: 'Masonic Restoration Foundation', url: 'https://www.masonicrestorationfoundation.org/', description: 'Dedicated to the traditional practice of Freemasonry.' },
      { label: 'The Midnight Freemasons', url: 'https://www.midnightfreemasons.org/', description: 'Masonic education, articles, and commentary.' },
    ],
  },
  {
    category: 'Local Community',
    links: [
      { label: 'City of Walled Lake', url: 'https://www.walledlake.org/', description: 'Official website of the City of Walled Lake, Michigan.' },
      { label: 'Commerce Township', url: 'https://www.commercetwp.com/', description: 'Commerce Charter Township, Oakland County.' },
    ],
  },
]

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Resources
        </p>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">
          Links &amp; Resources
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl">
          Useful links to Masonic organizations, state bodies, appendant orders, and local community resources.
        </p>
      </header>

      <div className="space-y-10">
        {LINK_GROUPS.map((group) => (
          <section key={group.category} aria-labelledby={group.category}>
            <h2
              id={group.category}
              className="font-serif text-xl font-bold text-navy-800 mb-4 pb-2 border-b border-stone-200"
            >
              {group.category}
            </h2>
            <div className="space-y-4">
              {group.links.map((link) => (
                <div key={link.url} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-navy-700 hover:text-navy-900 underline flex-shrink-0 sm:w-64"
                  >
                    {link.label} ↗
                  </a>
                  <p className="text-stone-600 text-sm">{link.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
