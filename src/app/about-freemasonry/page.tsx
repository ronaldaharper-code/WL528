import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Freemasonry',
  description:
    'Learn about Freemasonry — its history, values, and traditions. Freemasonry is the world\'s oldest and largest fraternal organization.',
  openGraph: { title: 'About Freemasonry | Walled Lake Lodge #528' },
}

const FAQ = [
  {
    q: 'What is Freemasonry?',
    a: 'Freemasonry is the world\'s oldest and largest fraternal organization. It teaches moral lessons through symbolic ritual and ceremonies derived from the craft of stonemasons. Freemasons are united by shared values — integrity, charity, and the pursuit of knowledge.',
  },
  {
    q: 'How old is Freemasonry?',
    a: 'Modern Freemasonry traces its origins to the founding of the first Grand Lodge in London in 1717, though many traditions and symbols are far older. Millions of men have been Freemasons, including many of history\'s most influential figures.',
  },
  {
    q: 'Who can become a Freemason?',
    a: 'Any man of good character who believes in a Supreme Being may petition a lodge. There is no religious requirement beyond that belief. Freemasonry welcomes men of all faiths, backgrounds, and occupations.',
  },
  {
    q: 'Is Freemasonry a religion?',
    a: 'No. Freemasonry is not a religion and does not replace religion. It requires a belief in a higher power but does not define or dictate what that belief should be. Masons of many faiths meet together in fellowship.',
  },
  {
    q: 'Is Freemasonry a secret society?',
    a: 'Freemasonry is a society with some secrets, not a secret society. Lodge buildings, member names, and meeting schedules are publicly known. Some ceremonial details are private — a tradition shared with many fraternal and civic organizations.',
  },
  {
    q: 'What does the Lodge do?',
    a: 'Lodges conduct degrees, celebrate Masonic traditions, support charitable causes, and provide fellowship. Many lodges — including ours — are active in community service and philanthropy.',
  },
]

export default function AboutFreemasonryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <header className="mb-12">
        <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Education &amp; History
        </p>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">About Freemasonry</h1>
        <p className="text-xl text-stone-600 leading-relaxed max-w-2xl">
          Freemasonry is the world&rsquo;s oldest and largest fraternal brotherhood — a society
          of men joined by shared values, timeless ritual, and a commitment to the improvement
          of themselves and their communities.
        </p>
      </header>

      {/* History Section */}
      <section aria-labelledby="history-heading" className="mb-12">
        <h2 id="history-heading" className="font-serif text-2xl font-bold text-navy-800 mb-4">
          A Brief History
        </h2>
        <div className="prose-mason">
          <p>
            The origins of modern Freemasonry are traced to the founding of the Premier Grand
            Lodge in London in 1717, though the fraternity draws its symbolism and ritual from
            the medieval guilds of operative stonemasons who built the great cathedrals of Europe.
          </p>
          <p>
            Over three centuries, Freemasonry spread across the globe. In America, Freemasonry
            flourished during the colonial and revolutionary periods. Many of the nation&rsquo;s
            founders — including George Washington, Benjamin Franklin, and Paul Revere — were
            Freemasons.
          </p>
          <p>
            Today, millions of Freemasons meet in lodges across the world, carrying on a tradition
            that has shaped individual character and civic life for generations.
          </p>
        </div>
      </section>

      {/* What Masons Believe */}
      <section aria-labelledby="beliefs-heading" className="mb-12 bg-stone-50 rounded-lg p-8">
        <h2 id="beliefs-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
          What Masons Believe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { title: 'Belief in a Supreme Being', body: 'A belief in a higher power — however defined by the individual — is the only religious requirement.' },
            { title: 'The Brotherhood of Man', body: 'All men, regardless of background, faith, or station, are brothers worthy of respect and charity.' },
            { title: 'Self-Improvement', body: 'Freemasonry challenges each man to become a better version of himself — morally, intellectually, and spiritually.' },
            { title: 'Civic Responsibility', body: 'Masons are expected to be good citizens — faithful to their families, their country, and their community.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-navy-800 mb-1">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mb-12">
        <h2 id="faq-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <div key={item.q} className="border-b border-stone-200 pb-6 last:border-0">
              <h3 className="font-semibold text-navy-800 mb-2">{item.q}</h3>
              <p className="text-stone-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <aside className="bg-navy-800 text-white rounded-lg p-8 text-center">
        <p className="font-serif text-xl font-semibold mb-2">Curious about Freemasonry?</p>
        <p className="text-stone-300 mb-6">
          The best way to learn more is to speak with a Mason you know, or to attend one
          of our public events. We educate — we do not recruit.
        </p>
        <p className="text-gold-400 font-semibold italic text-lg mb-6">
          &ldquo;To be one, ask one.&rdquo;
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/how-to-join" className="btn-primary bg-gold-500 hover:bg-gold-600 text-navy-900">
            How to Join
          </Link>
          <Link href="/contact" className="btn-secondary border-stone-500 text-stone-200 hover:bg-navy-700">
            Contact Us
          </Link>
        </div>
      </aside>
    </div>
  )
}
