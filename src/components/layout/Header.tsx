'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'About Freemasonry', href: '/about-freemasonry' },
  { label: 'About the Lodge',   href: '/about-lodge' },
  { label: 'How To Join',       href: '/how-to-join' },
  { label: 'Events',            href: '/events' },
  { label: 'Hall Rental',       href: '/hall-rental' },
  { label: 'Donate',            href: '/donate' },
  { label: 'Contact',           href: '/contact' },
]

export function Header() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="bg-navy-950 text-stone-100 sticky top-0 z-40 border-b border-white/5">
      {/* Thin gold accent line at top */}
      <div className="h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50
                   focus:bg-gold-500 focus:text-navy-950 focus:px-4 focus:py-2 focus:rounded-lg
                   focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Walled Lake Lodge #528 — Home">
            {/*
              TODO: Replace with real lodge logo.
              Place the logo file at /public/logo.png (or .svg) and swap the div below
              with: <Image src="/logo.png" alt="Lodge #528 seal" width={40} height={40} />
            */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0
                         bg-gradient-to-br from-gold-400 to-gold-600 shadow-sm
                         ring-2 ring-gold-500/30"
              aria-hidden="true"
            >
              <svg viewBox="0 0 40 40" className="w-6 h-6 text-navy-950" fill="currentColor">
                {/* Square & Compasses simplified SVG mark */}
                <path d="M20 4 L32 30 H8 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <circle cx="20" cy="20" r="2.5"/>
                <path d="M14 28 Q20 18 26 28" fill="none" stroke="currentColor" strokeWidth="2"/>
                <text x="20" y="23" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif" fontWeight="bold" fill="currentColor">G</text>
              </svg>
            </div>

            <div className="leading-tight">
              <div className="font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                Walled Lake Lodge
              </div>
              <div className="text-[11px] font-medium text-stone-400 tracking-wide">
                #528 &bull; F&amp;AM &bull; Walled Lake, MI
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ────────────────────────────────────────────────── */}
          <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-stone-300 hover:text-white hover:bg-white/8'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Auth + CTA ─────────────────────────────────────────────────── */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            {session ? (
              <>
                <Link
                  href="/member/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-semibold
                             bg-navy-800 text-gold-400 border border-navy-700
                             hover:bg-navy-700 hover:text-gold-300
                             transition-all duration-150"
                >
                  Member Portal
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-3 py-2 rounded-lg text-sm text-stone-400 hover:text-stone-200
                             hover:bg-white/8 transition-all duration-150"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-lg text-sm font-semibold
                           border border-stone-600 text-stone-200
                           hover:bg-white/8 hover:border-stone-400
                           transition-all duration-150"
              >
                Member Login
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger ───────────────────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10
                       transition-all duration-150"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div id="mobile-nav" className="xl:hidden border-t border-white/8 bg-navy-900">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`
                  block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive(link.href)
                    ? 'bg-white/10 text-white'
                    : 'text-stone-300 hover:text-white hover:bg-white/8'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-white/8 space-y-1">
              {session ? (
                <>
                  <Link
                    href="/member/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gold-400 hover:text-gold-300 hover:bg-white/8"
                  >
                    Member Portal
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="block w-full text-left px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-stone-200 hover:bg-white/8"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gold-400 hover:text-gold-300 hover:bg-white/8"
                >
                  Member Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
