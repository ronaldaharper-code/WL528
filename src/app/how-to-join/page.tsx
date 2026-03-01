import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Join Freemasonry',
  description:
    'Learn how to petition Walled Lake Lodge #528 for Masonic membership. We do not solicit membership — To be one, ask one.',
}

const STEPS = [
  {
    step: '01',
    title: 'Know a Mason',
    body: 'The traditional path to Freemasonry begins with knowing a member. Masonry is built on personal relationships and vouching. Ask someone you know who is a Mason about the craft.',
  },
  {
    step: '02',
    title: 'Ask About Membership',
    body: 'A Freemason cannot invite you to join — you must ask. This principle, "To be one, ask one," has been fundamental to Freemasonry for centuries. Express your interest directly.',
  },
  {
    step: '03',
    title: 'Submit a Petition',
    body: 'After conversations with lodge members, you may be invited to submit a written petition. The lodge will appoint an investigation committee to visit with you and your family.',
  },
  {
    step: '04',
    title: 'Lodge Vote',
    body: 'Your petition is presented to the lodge and a vote is taken by all members. Membership in Freemasonry requires a unanimous favorable ballot.',
  },
  {
    step: '05',
    title: 'Receive the Degrees',
    body: 'If elected, you will receive the three degrees of Masonry: Entered Apprentice, Fellow Craft, and Master Mason. Each degree is a meaningful ceremony conveying Masonic teachings.',
  },
  {
    step: '06',
    title: 'Welcome, Brother',
    body: 'Upon completing the third degree, you are a Master Mason — recognized as such by Masons around the world, sharing in the brotherhood of the fraternity.',
  },
]

const REQUIREMENTS = [
  'You must be a man of at least 18 years of age',
  'You must believe in a Supreme Being (no specific religion required)',
  'You must be of good moral character',
  'You must petition of your own free will — without persuasion or coercion',
  'You must be a resident of Michigan or have a meaningful connection to the area',
]

export default function HowToJoinPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <p className="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Membership Information
        </p>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">How to Join</h1>

        {/* Important Notice */}
        <div className="bg-navy-800 text-white rounded-lg p-6 mb-6">
          <p className="font-serif text-lg font-semibold text-gold-400 mb-2">
            &ldquo;To be one, ask one.&rdquo;
          </p>
          <p className="text-stone-300 leading-relaxed">
            Freemasonry does not recruit members. A Mason may not invite a man to join,
            nor may this website solicit membership. If you are interested in Freemasonry,
            you must approach a member and ask about joining.
          </p>
          <p className="text-stone-400 text-sm mt-3">
            This page provides information to help those who have already decided to inquire.
          </p>
        </div>
      </header>

      {/* Requirements */}
      <section aria-labelledby="requirements-heading" className="mb-12">
        <h2 id="requirements-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
          Basic Requirements
        </h2>
        <ul className="space-y-3">
          {REQUIREMENTS.map((req) => (
            <li key={req} className="flex items-start gap-3">
              <span className="text-gold-500 mt-1 flex-shrink-0" aria-hidden="true">✓</span>
              <span className="text-stone-700">{req}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Process Steps */}
      <section aria-labelledby="process-heading" className="mb-12">
        <h2 id="process-heading" className="font-serif text-2xl font-bold text-navy-800 mb-8">
          The Path to Membership
        </h2>
        <div className="space-y-6">
          {STEPS.map((step) => (
            <div key={step.step} className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-800 text-gold-400
                           flex items-center justify-center font-serif font-bold text-lg"
                aria-hidden="true"
              >
                {step.step}
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 mb-2">{step.title}</h3>
                <p className="text-stone-600 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Degrees Explained */}
      <section aria-labelledby="degrees-heading" className="mb-12 bg-stone-50 rounded-lg p-8">
        <h2 id="degrees-heading" className="font-serif text-2xl font-bold text-navy-800 mb-6">
          The Three Degrees
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              number: '1°',
              title: 'Entered Apprentice',
              body: 'The first degree introduces the candidate to Masonic symbolism and the principles of the craft.',
            },
            {
              number: '2°',
              title: 'Fellow Craft',
              body: 'The second degree emphasizes education, the liberal arts, and the individual\'s growth in knowledge.',
            },
            {
              number: '3°',
              title: 'Master Mason',
              body: 'The third and culminating degree conveys the deepest Masonic teachings and confers full membership.',
            },
          ].map((degree) => (
            <div key={degree.number} className="text-center">
              <div className="text-3xl font-serif text-gold-500 mb-2" aria-hidden="true">{degree.number}</div>
              <h3 className="font-semibold text-navy-800 mb-2">{degree.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{degree.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <div className="bg-navy-50 rounded-lg p-8 border border-navy-100">
        <h2 className="font-serif text-xl font-bold text-navy-800 mb-3">Have Questions?</h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          If you have questions about Freemasonry or Walled Lake Lodge #528, you are
          welcome to contact us. We are happy to answer general questions about the
          fraternity and our lodge.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact the Lodge
        </Link>
      </div>
    </div>
  )
}
