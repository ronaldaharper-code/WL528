import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `WL528 Heritage Collection | ${siteConfig.name}`,
  description:
    'Apparel and merchandise inspired by the history, brotherhood, and community of Walled Lake Masonic Lodge #528.',
}

// ── Product data ──────────────────────────────────────────────────────────────
// To swap an image, update the `image` field. All files live in /public/merch/

const FEATURED = {
  title: 'Heritage Hoodie',
  subtitle: 'Est. 1924',
  tags: ['Heritage Series', 'Limited Run', 'Local Pride'],
  description:
    'A vintage-inspired hoodie featuring the historic Walled Lake Masonic Lodge artwork with an aged, sepia-toned design and Est. 1924 detail. Built to feel like local heritage apparel, not generic lodge merch.',
  image: '/merch/imagehoody.png',         // swap: heritage hoodie mockup
  price: '$49.99',
}

const IDENTITY_COLLECTION = [
  {
    id: 'brother-tee',
    title: 'B.R.O.T.H.E.R. Identity Tee',
    description: 'A bold acronym design built around the principles of Brotherhood, Respect, Obligation, Tradition, Honor, Enlightenment, and Responsibility.',
    image: '/merch/imagetshirt.png',       // swap: BROTHER acronym tee
    tags: ['Identity Series'],
    price: '$24.99',
  },
  {
    id: 'logo-hat',
    title: 'Minimal Logo Hat',
    description: 'A simple everyday hat featuring the Walled Lake Masons #528 crest. Clean, wearable, and built for visibility without shouting.',
    image: '/merch/imagehat.png',          // swap: trucker hat mockup
    tags: ['Everyday Wear'],
    price: '$24.99',
  },
  {
    id: 'brotherhood-tee',
    title: 'Brotherhood Identity Tee',
    description: 'A clean modern identity shirt centered on the word Brotherhood, designed for members, supporters, and anyone who values strong community.',
    image: '/merch/imagebrotherhood.png',  // swap: Brotherhood script tee
    tags: ['Identity Series'],
    price: '$22.99',
  },
]

const COMMUNITY_COLLECTION = [
  {
    id: 'dragged-tee',
    title: '"I Was Dragged Here By A Mason"',
    description: 'A little humor. A lot of truth. The perfect shirt for the wives, kids, and friends who show up anyway — and end up loving it.',
    image: '/merch/imagedragged.png',      // swap: "I Was Dragged Here" tee
    tags: ['Community & Event'],
    price: '$22.99',
  },
  {
    id: 'father-tee',
    title: '"My Father Is A Mason"',
    description: 'A bold tribute tee for the sons and daughters proud to carry the legacy. Wear it with honor.',
    image: '/merch/imagefather.png',       // swap: "My Father Is A Mason" tee
    tags: ['Community & Event'],
    price: '$22.99',
  },
  {
    id: 'memorial-tee',
    title: 'Memorial Day Open House Tee',
    description: 'A lighthearted event shirt created for the Memorial Day Open House. Designed to make the lodge feel approachable, active, and fun.',
    image: '/merch/imagememorial.png',     // swap: memorial day tee mockup
    tags: ['Event Series'],
    price: '$22.99',
  },
]

const PREMIUM_COLLECTION = [
  {
    id: 'quarter-zip',
    title: 'Embroidered Quarter-Zip',
    description: 'A polished navy quarter-zip with the Walled Lake Masons #528 crest embroidered on the chest. Professional enough for lodge events, casual enough for everyday wear.',
    image: '/merch/imagequarterzip.png',   // swap: quarter-zip mockup
    tags: ['Premium Collection'],
    price: '$49.99',
  },
  {
    id: 'brotherhood-alt',
    title: 'Brotherhood Tee — Block Edition',
    description: 'A bold, clean take on the Brotherhood identity. Block lettering, gold accents, built to wear anywhere you want to rep the lodge.',
    image: '/merch/imagebrohood1.png',     // swap: Brotherhood block tee
    tags: ['Premium Collection'],
    price: '$22.99',
  },
]

// ── Section divider ───────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-600/60" aria-hidden="true" />
      <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold-600/60" aria-hidden="true" />
    </div>
  )
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({
  title,
  description,
  image,
  tags,
  price,
}: {
  title: string
  description: string
  image: string
  tags?: string[]
  price: string
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/8 flex flex-col group"
      style={{ background: 'linear-gradient(to bottom, #151c2e, #0f1520)' }}>
      {/* Image area — light background so product photos show clearly */}
      <div className="relative bg-stone-100 aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        />
      </div>
      {/* Text area */}
      <div className="p-5 flex flex-col flex-1 border-t border-white/8">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-gold-400/70">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-serif text-base font-bold text-stone-100 mb-2 leading-snug">{title}</h3>
        <p className="text-stone-400 text-sm leading-relaxed flex-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gold-400 font-bold text-lg">{price}</span>
          <span className="text-xs font-semibold text-stone-500 border border-stone-700 rounded-full px-3 py-1">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MerchandisePage() {
  return (
    <div style={{ background: '#0c1018' }}>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #080c14 0%, #0f1825 50%, #080c14 100%)' }}>
        {/* Subtle dot texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #c9891f 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-gold-600/30 bg-gold-500/8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                <span className="text-gold-300 text-[11px] font-bold uppercase tracking-[0.2em]">Est. 1924</span>
              </div>

              <h1 className="font-serif leading-none mb-5">
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white">WL528</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-gold-400">Heritage</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white">Collection</span>
              </h1>

              <p className="text-stone-300 text-lg leading-relaxed mb-4 max-w-md">
                Apparel and merchandise inspired by the history, brotherhood, and community of Walled Lake Masonic Lodge #528.
              </p>

              <p className="text-gold-400/80 text-base font-medium italic mb-8">
                Wear the tradition. Share the story.
              </p>

              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold-600/50" aria-hidden="true" />
                <span className="text-stone-500 text-[11px] font-bold uppercase tracking-[0.2em]">Walled Lake, Michigan</span>
              </div>
            </div>

            {/* Hero image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px]">
                <div className="absolute inset-0 rounded-full bg-gold-500/5 blur-3xl scale-75" aria-hidden="true" />
                <Image
                  src={FEATURED.image}
                  alt="WL528 Heritage Hoodie — Est. 1924"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 640px) 320px, 420px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent" aria-hidden="true" />
      </section>

      {/* ── Heritage Collection (featured) ──────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label="Heritage Collection" />

          <div className="rounded-2xl overflow-hidden border border-white/8"
            style={{ background: 'linear-gradient(to right, #111827, #0f1520)' }}>
            <div className="grid md:grid-cols-2">

              {/* Image */}
              <div className="relative bg-stone-100 min-h-72 aspect-square md:aspect-auto">
                <Image
                  src={FEATURED.image}
                  alt={`${FEATURED.title} — ${FEATURED.subtitle}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/8">
                <div className="flex flex-wrap gap-2 mb-5">
                  {FEATURED.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold-600/30 text-gold-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-serif text-3xl font-bold text-white mb-1">{FEATURED.title}</h2>
                <p className="text-gold-400 font-bold text-sm uppercase tracking-widest mb-5">{FEATURED.subtitle}</p>
                <p className="text-stone-400 leading-relaxed mb-8">{FEATURED.description}</p>

                <div className="flex items-center gap-6">
                  <span className="text-gold-400 font-bold text-2xl">{FEATURED.price}</span>
                  <span className="text-sm font-semibold text-stone-500 border border-stone-700 rounded-full px-4 py-2">
                    Coming Soon
                  </span>
                </div>
                <p className="text-stone-600 text-xs mt-3">Online ordering coming soon — see the interest form below.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Identity Collection ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label="Identity Collection" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {IDENTITY_COLLECTION.map(p => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Community & Event ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label="Community & Event" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMUNITY_COLLECTION.map(p => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Premium Collection ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label="Premium Collection" />
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {PREMIUM_COLLECTION.map(p => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── More Than Merchandise ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-gold-600/30 bg-gold-500/8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            <span className="text-gold-300 text-[11px] font-bold uppercase tracking-[0.2em]">WL528</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">More Than Merchandise</h2>
          <p className="text-stone-400 text-lg leading-relaxed">
            This collection is about visibility, pride, and connection. Every hat, hoodie, shirt, and sticker helps put Walled Lake Masons #528 back into the community conversation. Our goal is simple: make the lodge more visible, more approachable, and more recognizable throughout Walled Lake and the surrounding area.
          </p>
        </div>
      </section>

      {/* ── Interest CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
            Interested in WL528 merchandise?
          </h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            Online ordering is coming soon. For now, let us know what items you would be interested in and we&apos;ll follow up when ordering becomes available.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold bg-gold-500 text-navy-950 hover:bg-gold-400 transition-colors duration-150"
          >
            Contact Us About Merchandise
          </Link>
        </div>
      </section>

      {/* ── Footer strip ─────────────────────────────────────────────────────── */}
      <div className="border-t border-white/8 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-stone-300 font-bold text-sm uppercase tracking-widest">
              Brotherhood. Charity. Integrity.
            </p>
            <p className="text-stone-500 text-xs mt-1">Building Better Men. Building a Better Community.</p>
          </div>
          <div className="flex items-center gap-2 text-stone-500">
            <span className="text-gold-600 text-lg" aria-hidden="true">⊕</span>
            <span className="text-xs font-semibold uppercase tracking-widest">Est. 1924</span>
          </div>
        </div>
      </div>

    </div>
  )
}
