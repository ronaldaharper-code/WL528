import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StagingBanner } from '@/components/ui/StagingBanner'
import { Analytics } from '@/components/Analytics'
import { SessionProvider } from '@/components/SessionProvider'
import { siteConfig } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Freemasonry in Walled Lake, Michigan`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    'Freemasonry', 'Masons', 'Walled Lake', 'Michigan',
    'Lodge 528', 'Masonic Lodge', 'Oakland County', 'F&AM',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${siteConfig.name} — Walled Lake, Michigan` }],
  },
  twitter: { card: 'summary_large_image' },
  robots:
    process.env.STAGING === 'true'
      ? { index: false, follow: false }
      : { index: true, follow: true },
}

// Correct address: 374 W. Walled Lake Drive, Walled Lake, MI 48390
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: siteConfig.address.country,
  },
  ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
  sameAs: Object.values(siteConfig.social).filter(Boolean),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-800 antialiased">
        <SessionProvider>
          <StagingBanner />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
