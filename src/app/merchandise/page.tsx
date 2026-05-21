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
  series: 'Heritage Series',
  badge: 'Limited Run',
  description:
    'A vintage-inspired hoodie featuring the historic Walled Lake Masonic Lodge artwork with an aged, sepia-toned design and Est. 1924 detail. Built to feel like local heritage apparel, not generic lodge merch.',
  image: '/merch/imagehoody.png',         // swap: hoodie mockup image
  ctaLabel: 'Coming Soon',
}

const IDENTITY_COLLECTION = [
  {
    id: 'brother-tee',
    title: 'B.R.O.T.H.E.R. Identity Tee',
    description:
      'A bold acronym design built around the principles of Brotherhood, Respect, Obligation, Tradition, Honor, Enlightenment, and Responsibility.',
    image: '/merch/imagebrohood1.png',     // swap: BROTHER acronym tee mockup
    tags: ['Identity Series'],
    ctaLabel: 'Coming Soon',
  },
  {
    id: 'brotherhood-tee',
    title: 'Brotherhood Tee',
    description:
      'A clean modern identity shirt centered on the word Brotherhood, designed for members, supporters, and anyone who values strong community.',
    image: '/merch/imagebrotherhood.png', // swap: Brotherhood tee mockup
    tags: ['Identity Series'],
    ctaLabel: 'Coming Soon',
  },
  {
    id: 'logo-hat',
    title: 'Minimal Logo Hat',
    description:
      'A simple everyday hat featuring the Walled Lake Masons #528 crest. Clean, wearable, and built for visibility without shouting.',
    image: '/merch/imagehat.png',         // swap: hat mockup
    tags: ['Everyday Wear'],
    ctaLabel: 'Coming Soon',
  },
]

const HERITAGE_EVERYDAY = [
  {
    id: 'quarter-zip',
    title: 'Quarter-Zip Pullover',
    description:
      'A polished navy quarter-zip with a small Walled Lake Masons #528 logo on the chest. Professional enough for lodge events, casual enough for everyday wear.',
    image: '/merch/imagequarterzip.png',  // swap: quarter-zip mockup
    tags: ['Heritage Series'],
    ctaLabel: 'Coming Soon',
  },
  {
    id: 'sticker',
    title: 'Vintage Lodge Sticker',
    description:
      'A sepia-toned lodge sticker inspired by the historic building artwork. A simple way to share WL528 pride on laptops, water bottles, toolboxes, and more.',
    image: '/merch/imagedragged.png',     // swap: sticker mockup
    tags: ['Accessories'],
    ctaLabel: 'Coming Soon',
  },
  {
    id: 'memorial-tee',
    title: 'Memorial Day Open House Tee',
    description:
      'A lighthearted event shirt created for the Memorial Day Open House. Designed to make the lodge feel approachable, active, and fun.',
    image: '/merch/imagememorial.png',    // swap: memorial day tee mockup
    tags: ['Event Series'],
    ctaLabel: 'Coming Soon',
  },
]

// ── Product card component ────────────────────────────────────────────────────

function ProductCard({
  title,
  description,
  image,
  tags,
  ctaLabel,
}: {
  title: string
  description: string
  image: string
  tags?: string[]
  ctaLabel: string
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group">
      <div className="relative bg-stone-50 aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-50 text-gold-700 border border-gold-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-serif text-lg font-bold text-navy-900 mb-2 leading-snug">{title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed flex-1">{description}</p>
        <div className="mt-5">
          <span className="inline-block w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-stone-100 text-stone-400 border border-stone-200 cursor-default select-none">
            {ctaLabel}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MerchandisePage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-gold-600/40 bg-gold-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">Est. 1924</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                WL528<br />
                <span className="text-gold-400">Heritage</span><br />
                Collection
              </h1>

              <p className="text-stone-300 text-lg leading-relaxed mb-4 max-w-lg">
                Apparel and merchandise inspired by the history, brotherhood, and community of Walled Lake Masonic Lodge #528.
              </p>

              <p className="text-gold-400/80 text-base font-medium italic">
                Wear the tradition. Share the story.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-10 bg-gold-600/60" aria-hidden="true" />
                <span className="text-stone-500 text-xs font-semibold uppercase tracking-widest">Walled Lake, Michigan</span>
              </div>
            </div>

            {/* Hero image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-8 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
                <Image
                  src={FEATURED.image}
                  alt="WL528 Heritage Hoodie — Est. 1924"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 640px) 288px, 384px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" aria-hidden="true" />
      </section>

      {/* ── Featured Item ──────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-gold-500" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-navy-900">Featured Heritage Piece</h2>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">

              <div className="relative bg-navy-950 aspect-square md:aspect-auto min-h-72">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-12 rounded-full bg-gold-500/8 blur-3xl" aria-hidden="true" />
                <Image
                  src={FEATURED.image}
                  alt={`${FEATURED.title} — ${FEATURED.subtitle}`}
                  fill
                  className="object-contain p-10"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200">
                    {FEATURED.series}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-50 text-navy-700 border border-navy-200">
                    {FEATURED.badge}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                    Local Pride
                  </span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-navy-900 mb-1">
                  {FEATURED.title}
                </h3>
                <p className="text-gold-600 font-semibold text-sm mb-5 uppercase tracking-widest">
                  {FEATURED.subtitle}
                </p>

                <p className="text-stone-600 leading-relaxed mb-8">
                  {FEATURED.description}
                </p>

                <div>
                  <span className="inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-stone-100 text-stone-400 border border-stone-200 cursor-default select-none">
                    {FEATURED.ctaLabel}
                  </span>
                  <p className="text-stone-400 text-xs mt-3">
                    Online ordering coming soon — see the interest form below.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Identity Collection ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-gold-500" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-navy-900">Identity Collection</h2>
          </div>
          <p className="text-stone-500 text-sm mb-10 ml-11">
            Designs rooted in the values and identity of Masonry.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IDENTITY_COLLECTION.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Heritage & Everyday Wear ───────────────────────────────────────────── */}
      <section className="bg-stone-50 py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-gold-500" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-navy-900">Heritage &amp; Everyday Wear</h2>
          </div>
          <p className="text-stone-500 text-sm mb-10 ml-11">
            Pieces built for everyday visibility and lodge events.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HERITAGE_EVERYDAY.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Collection Preview (imageweb.png mockup) ──────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-8 bg-gold-500" aria-hidden="true" />
              <h2 className="font-serif text-2xl font-bold text-navy-900">The Vision</h2>
              <div className="h-px w-8 bg-gold-500" aria-hidden="true" />
            </div>
            <p className="text-stone-500 text-sm">A preview of the full WL528 collection concept.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <Image
              src="/merch/imageweb.png"
              alt="WL528 Heritage Collection — full lineup concept preview"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* ── More Than Merchandise ─────────────────────────────────────────────── */}
      <section className="bg-navy-950 py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-gold-600/40 bg-gold-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">WL528</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            More Than Merchandise
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed">
            This collection is about visibility, pride, and connection. Every hat, hoodie, shirt, and sticker helps put Walled Lake Masons #528 back into the community conversation. Our goal is simple: make the lodge more visible, more approachable, and more recognizable throughout Walled Lake and the surrounding area.
          </p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-600/60" aria-hidden="true" />
            <span className="text-gold-500 text-xl" aria-hidden="true">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-600/60" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── Interest CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
            Interested in WL528 merchandise?
          </h2>
          <p className="text-stone-500 leading-relaxed mb-8">
            Online ordering is coming soon. For now, let us know what items you would be interested in and we&apos;ll follow up when ordering becomes available.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-semibold bg-navy-900 text-white hover:bg-navy-800 transition-colors duration-150"
          >
            Contact Us About Merchandise
          </Link>
          <p className="text-stone-400 text-xs mt-4">
            We&apos;ll follow up when ordering is available.
          </p>
        </div>
      </section>

    </div>
  )
}
