import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StagingBanner } from '@/components/ui/StagingBanner'
import { Analytics } from '@/components/Analytics'
import { SessionProvider } from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.walledlakemasons.com'),
  title: {
    default: 'Walled Lake Lodge #528 F&AM — Freemasonry in Walled Lake, Michigan',
    template: '%s | Walled Lake Lodge #528',
  },
  description:
    'Walled Lake Lodge #528 Free and Accepted Masons — serving the Walled Lake community in Oakland County, Michigan since 1949.',
  keywords: ['Freemasonry', 'Masons', 'Walled Lake', 'Michigan', 'Lodge 528', 'Masonic Lodge'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Walled Lake Lodge #528 F&AM',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots:
    process.env.STAGING === 'true'
      ? { index: false, follow: false }
      : { index: true, follow: true },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Walled Lake Lodge #528 F&AM',
  url: 'https://www.walledlakemasons.com',
  logo: 'https://www.walledlakemasons.com/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1499 N Pontiac Trail',
    addressLocality: 'Walled Lake',
    addressRegion: 'MI',
    postalCode: '48390',
    addressCountry: 'US',
  },
  telephone: '',
  sameAs: [
    'https://www.facebook.com/walledlakemasons',
  ],
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
