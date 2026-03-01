'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'About Freemasonry', href: '/about-freemasonry' },
  { label: 'About the Lodge', href: '/about-lodge' },
  { label: 'How To Join', href: '/how-to-join' },
  { label: 'Events', href: '/events' },
  { label: 'Hall Rental', href: '/hall-rental' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-navy-900 text-stone-100 shadow-lg">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50
                   focus:bg-gold-500 focus:text-navy-900 focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo / Lodge Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative flex-shrink-0">
              {/* Masonic square and compasses emblem placeholder */}
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                <span className="text-navy-900 font-serif font-bold text-sm leading-none">G</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold leading-tight text-stone-100 group-hover:text-gold-300 transition-colors">
                Walled Lake Lodge
              </span>
              <span className="text-xs text-stone-400">#528 Free &amp; Accepted Masons</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded text-sm text-stone-300 hover:text-gold-300 hover:bg-navy-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {session ? (
              <>
                <Link href="/member/dashboard" className="btn-secondary text-sm border-stone-600 text-stone-200 hover:bg-navy-800">
                  Member Portal
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-ghost text-sm text-stone-400 hover:text-stone-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="btn-secondary text-sm border-stone-600 text-stone-200 hover:bg-navy-800">
                Member Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded text-stone-300 hover:text-gold-300 hover:bg-navy-800"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-700 bg-navy-800">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded text-stone-300 hover:text-gold-300 hover:bg-navy-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-navy-700">
              {session ? (
                <>
                  <Link
                    href="/member/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-gold-400 font-medium"
                  >
                    Member Portal
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="block w-full text-left px-3 py-2 text-stone-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-gold-400 font-medium"
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
