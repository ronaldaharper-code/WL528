import Link from 'next/link'
import { siteConfig } from '@/config/site'

const QUICK_LINKS = [
  { label: 'About Freemasonry', href: '/about-freemasonry' },
  { label: 'About the Lodge',   href: '/about-lodge' },
  { label: 'How To Join',       href: '/how-to-join' },
  { label: 'Upcoming Events',   href: '/events' },
  { label: 'Hall Rental',       href: '/hall-rental' },
  { label: 'Donate',            href: '/donate' },
  { label: 'Contact',           href: '/contact' },
  { label: 'Links',             href: '/links' },
]

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-stone-400">
      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* ── Identity ─────────────────────────────────────────────────── */}
          <div>
            {/* Logo mark */}
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0
                           bg-gradient-to-br from-gold-400 to-gold-600 shadow-sm"
                aria-hidden="true"
              >
                <svg viewBox="0 0 40 40" className="w-6 h-6 text-navy-950" fill="currentColor">
                  <path d="M20 4 L32 30 H8 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                  <circle cx="20" cy="20" r="2.5"/>
                  <path d="M14 28 Q20 18 26 28" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <text x="20" y="23" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif" fontWeight="bold" fill="currentColor">G</text>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-serif font-bold text-white text-base group-hover:text-gold-300 transition-colors">
                  Walled Lake Lodge #528
                </div>
                <div className="text-xs text-stone-500">Free &amp; Accepted Masons</div>
              </div>
            </Link>

            <address className="not-italic text-sm leading-loose text-stone-500">
              {siteConfig.address.multiLine.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </address>

            {siteConfig.phone && (
              <a href={`tel:${siteConfig.phone}`} className="block mt-2 text-sm text-stone-500 hover:text-stone-300 transition-colors">
                {siteConfig.phone}
              </a>
            )}

            <p className="mt-5 font-serif italic text-gold-500/70 text-sm leading-relaxed">
              &ldquo;To be one, ask one.&rdquo;
            </p>

            {/* Social */}
            <div className="flex gap-2 mt-5">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Walled Lake Lodge on Facebook"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                             text-stone-500 hover:text-gold-400 hover:bg-white/10 hover:border-white/20
                             transition-all duration-150"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
          </div>

          {/* ── Quick Links ──────────────────────────────────────────────── */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-stone-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-gold-300 hover:translate-x-0.5
                               transition-all duration-150 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources ────────────────────────────────────────────────── */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-stone-300 mb-5">
              Resources
            </h3>
            <div className="space-y-4">
              <div>
                <a
                  href={siteConfig.grandLodgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-gold-300 transition-colors"
                >
                  Michigan Grand Lodge
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <p className="text-xs text-stone-600 mt-0.5">michiganmasons.org</p>
              </div>
              <div>
                <Link href="/member/dashboard" className="text-sm text-stone-500 hover:text-gold-300 transition-colors">
                  Member Portal →
                </Link>
                <p className="text-xs text-stone-600 mt-0.5">Lodge members only</p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Chartered under the Grand Lodge of Michigan, F&amp;AM.
                  Est. {siteConfig.established}, Oakland County.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-600">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-stone-700 italic">
            Established {siteConfig.established} &middot; Oakland County, Michigan
          </p>
        </div>
      </div>
    </footer>
  )
}
