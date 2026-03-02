export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Announcement',
  robots: { index: false },
}

export default async function AnnouncementPage() {
  // Temporary safety page until Sanity announcement queries are re-added.
  // This prevents Vercel builds from failing when QUERIES.* is missing.
  notFound()
}