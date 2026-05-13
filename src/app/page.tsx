import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Walled Lake Lodge #528 F&AM — Brotherhood. Purpose. Legacy.',
  description: siteConfig.description,
}

// ─── Why Men Join ─────────────────────────────────────────────────────────────
const WHY_JOIN = [
  {
    title: 'Brotherhood',
    body: 'A network of men who show up for each other — not just in meetings, but in life. Real friendships built on shared values.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Leadership',
    body: 'Every role, every ritual, every degree teaches you to lead with integrity. Freemasonry has shaped leaders for centuries.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Service',
    body: 'Real charitable work that leaves a mark on your community — and on you. We serve Oakland County year-round.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'Personal Growth',
    body: 'Freemasonry challenges you to examine yourself honestly and become a better version of who you already are.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Mentorship',
    body: 'Learn from men who have walked the path before you. Wisdom passed down, not looked up. That is what brotherhood means.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Purpose',
    body: 'Join something larger than yourself. Be part of a brotherhood and a legacy that has endured for over 100 years.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

// ─── What We Actually Do ──────────────────────────────────────────────────────
const WHAT_WE_DO = [
  {
    title: 'Fellowship',
    body: 'Monthly gatherings where friendships become brotherhood. Good food, real conversation, and the kind of connection that actually sticks.',
    image: '/lodge-fellowship.jpg',
    imageAlt: 'Lodge members enjoying a community gathering',
  },
  {
    title: 'Community Service',
    body: 'Scholarships, food drives, civic projects. We have been serving Oakland County for over 100 years — and we are not done.',
    image: '/lodge-scholarship.jpg',
    imageAlt: 'Lodge presenting a scholarship award to a community member',
  },
  {
    title: 'Civic Engagement',
    body: 'Parade participation, open houses, community events. We are visible, active, and proud members of the Walled Lake community.',
    image: '/lodge-parade.jpg',
    imageAlt: 'Lodge members at a community event',
  },
]

// ─── Membership Journey ───────────────────────────────────────────────────────
const JOURNEY = [
  {
    step: '01',
    title: 'Visit the Lodge',
    body: 'Come see the building. Meet a brother or two. No pressure, no pitch — just an open door.',
  },
  {
    step: '02',
    title: 'Meet the Brothers',
    body: 'Talk to real members. Ask real questions. Get a feel for who we are and what we stand for.',
  },
  {
    step: '03',
    title: 'Ask Everything',
    body: 'There are no dumb questions. Every brother started exactly where you are standing right now.',
  },
  {
    step: '04',
    title: 'Attend an Event',
    body: 'Come to a dinner or open house before making any decisions. See lodge life firsthand.',
  },
  {
    step: '05',
    title: 'Decide What Feels Right',
    body: 'When you are ready — if you are ready — the door is open. The choice is always yours.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO — full-bleed real photography, emotional identity
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center" aria-label="Welcome to Walled Lake Lodge #528">
        <Image
          src="/hero-community.jpg"
          alt="Lodge members gathered at a Walled Lake community event"
          fill
          className="object-cover object-[center_60%]"
          priority
        />
        {/* Light directional gradient — text shadow carries the readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/40 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-2xl">
            <span
              className="text-white/90 text-xs font-bold uppercase tracking-[0.18em] mb-6 block"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
            >
              Est. {siteConfig.established} &bull; Walled Lake, Michigan
            </span>

            <h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-bold text-white leading-[1.04] tracking-tight mb-7"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
            >
              Good Men Still Gather Here.
            </h1>

            <p
              className="text-lg sm:text-xl text-white leading-relaxed mb-10 max-w-lg"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}
            >
              Walled Lake Lodge #528 is a brotherhood of men committed to growth,
              service, and genuine fellowship — rooted in over 100 years of tradition.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/about-freemasonry" className="btn btn-gold btn-lg text-center">
                Curious About Masonry?
              </Link>
              <Link href="/how-to-join" className="btn btn-primary btn-lg text-center">
                How to Join
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg text-center">
                Visit the Lodge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TAGLINE STRIP
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-navy-900 py-5 px-4 text-center">
        <p className="font-serif text-gold-400/90 text-lg sm:text-xl italic tracking-wide">
          &ldquo;Brotherhood. Purpose. Legacy.&rdquo;
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          WHY MEN JOIN
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="why-heading" className="section bg-stone-50">
        <div className="container-wide">
          <div className="max-w-2xl mb-14">
            <h2 id="why-heading" className="heading-lg text-stone-900 mb-5">
              Men join for the history.<br />
              They stay for the brotherhood.
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              Freemasonry attracts men who want more — more purpose, more connection,
              more meaning. Here is what they find.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {WHY_JOIN.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-stone-200/70 p-7
                           hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div
                  className="w-11 h-11 rounded-xl bg-navy-50 border border-navy-100/60
                             flex items-center justify-center mb-5 text-navy-700
                             group-hover:bg-navy-100 transition-colors duration-150"
                >
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHAT WE ACTUALLY DO
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="do-heading" className="section bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow mb-3 block">Lodge Life</span>
            <h2 id="do-heading" className="heading-lg text-stone-900 mb-5">
              We&apos;re more active<br />than you think.
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              Lodge life is dinners, service projects, open houses, charity work,
              and genuine friendship. Here is what that actually looks like.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {WHAT_WE_DO.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl overflow-hidden border border-stone-200/70 bg-white
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BROTHERHOOD PHOTO
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="brotherhood-heading" className="section bg-stone-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="eyebrow mb-3 block">Our Brotherhood</span>
            <h2 id="brotherhood-heading" className="heading-md">Brothers in Fellowship</h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/60">
            <div className="relative aspect-[4/3] sm:aspect-[16/7]">
              <Image
                src="/IMG_2461 copy.png"
                alt="Members of Walled Lake Lodge #528 gathered in the lodge room"
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent px-6 py-8 sm:px-10 sm:py-10">
              <p className="font-serif text-white text-base sm:text-xl font-semibold">
                Walled Lake Lodge #528 &mdash; Brothers Gathered in Fellowship
              </p>
              <p className="text-stone-300/80 text-sm mt-1">
                Walled Lake, Michigan &middot; Oakland County &middot; Est. 1924
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MEMBERSHIP JOURNEY
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="journey-heading" className="section bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow mb-3 block">Your Path</span>
            <h2 id="journey-heading" className="heading-lg text-stone-900 mb-5">
              You&apos;re Not Recruited.<br />You&apos;re Welcomed.
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              Freemasonry has never solicited members. The door is always open —
              but you walk through it yourself, on your own terms, in your own time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {JOURNEY.map((item, i) => (
              <div key={item.step} className="relative">
                {/* Connector line between steps on large screens */}
                {i < JOURNEY.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-5 left-[calc(50%+1.5rem)] right-[-1.5rem] h-px bg-stone-200"
                    aria-hidden="true"
                  />
                )}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="w-10 h-10 rounded-full bg-navy-900 text-white text-xs font-bold font-mono flex items-center justify-center mb-4 shrink-0">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/how-to-join" className="btn btn-primary btn-lg">
              Learn How to Join
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="events-heading" className="section bg-stone-50">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow mb-2 block">Stay Connected</span>
              <h2 id="events-heading" className="heading-md">What&apos;s Happening</h2>
            </div>
            <Link href="/events" className="text-sm text-navy-600 hover:text-navy-800 font-medium transition-colors">
              View Full Calendar &rarr;
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-10 sm:p-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="font-serif text-xl font-semibold text-navy-800 mb-3">See What&apos;s Coming Up</p>
            <p className="text-stone-500 text-sm leading-relaxed mb-7 max-w-sm mx-auto">
              Dinners, open houses, degree nights, community events — see everything
              on the lodge calendar.
            </p>
            <Link href="/events" className="btn btn-primary">
              Open Events Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT FREEMASONRY — concise, approachable, modern
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="about-heading" className="section bg-navy-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 80L80 0M-20 20L20 -20M60 100L100 60' stroke='%23c9891f' stroke-width='1'/%3E%3C/svg%3E")` }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow mb-4 block text-gold-400">About Freemasonry</span>
          <h2 id="about-heading" className="heading-lg text-white mb-7">
            One of the Oldest<br />Brotherhoods in the World.
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-5 max-w-2xl mx-auto">
            Freemasonry is a fraternal organization built on the belief that good men
            can make themselves — and their communities — better. It is not a religion,
            not a political organization, and not a secret society.
          </p>
          <p className="text-stone-400 leading-relaxed mb-11 max-w-2xl mx-auto">
            It is a brotherhood of men from all walks of life — different backgrounds,
            different careers, different beliefs — united by shared values and a genuine
            desire to do good in the world.
          </p>

          {/* Three Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {[
              { tenet: 'Brotherly Love', body: 'Respect and kindness toward all mankind — treating every person with care and compassion.' },
              { tenet: 'Relief', body: 'Charitable giving and aid to those in need — brothers, families, and the wider community.' },
              { tenet: 'Truth', body: 'A lifelong commitment to honesty, integrity, and the pursuit of moral and spiritual knowledge.' },
            ].map(({ tenet, body }) => (
              <div key={tenet} className="rounded-xl border border-white/10 bg-white/5 px-6 py-7 text-left">
                <p className="font-serif text-gold-400 font-semibold text-lg mb-2">{tenet}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/about-freemasonry" className="btn btn-gold btn-lg">
              Learn About Freemasonry
            </Link>
            <Link href="/about-lodge" className="btn btn-outline btn-lg">
              About the Lodge
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HALL RENTAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="rental-heading" className="section bg-white">
        <div className="container-wide">
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-lg">
                <span className="eyebrow mb-2 block">Available for Private Events</span>
                <h2 id="rental-heading" className="heading-md mb-3">Hall Rental</h2>
                <p className="text-stone-600 leading-relaxed">
                  Our hall seats up to{' '}
                  <strong className="text-stone-800">125 guests</strong> and is available
                  for private celebrations, community gatherings, meetings, and more.
                </p>
              </div>
              <Link href="/hall-rental" className="btn btn-primary btn-lg shrink-0">
                Inquire About Rental
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DONATE CTA
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="donate-heading" className="section bg-hero text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 80L80 0M-20 20L20 -20M60 100L100 60' stroke='%23c9891f' stroke-width='1'/%3E%3C/svg%3E")` }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow mb-4 block text-gold-400">Support Our Work</span>
          <h2 id="donate-heading" className="heading-lg text-white mb-5">
            Support the Lodge
          </h2>
          <p className="lead text-stone-300 mb-10 max-w-xl mx-auto">
            Your contribution supports lodge operations, community charitable works,
            and the preservation of our meeting place for future generations.
          </p>
          <Link href="/donate" className="btn btn-gold btn-lg">
            Make a Donation
          </Link>
        </div>
      </section>
    </>
  )
}
