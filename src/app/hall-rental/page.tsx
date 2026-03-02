export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { HallRentalForm } from '@/components/HallRentalForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Hall Rental | ${siteConfig.name}`,
  description: 'Request information about renting the lodge hall.',
}

export default async function HallRentalPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">Hall Rental</h1>
        <p className="text-gray-600 mb-8">
          Fill out the form below and we’ll get back to you with availability and details.
        </p>
      </div>

      <HallRentalForm />
    </div>
  )
}