import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Thank You for Your Donation' }

export default function DonateSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="text-gold-500 text-6xl mb-6" aria-hidden="true">◆</div>
      <h1 className="font-serif text-3xl font-bold text-navy-900 mb-4">
        Thank You for Your Generosity
      </h1>
      <p className="text-stone-600 text-lg leading-relaxed mb-6">
        Your donation to Walled Lake Lodge #528 supports our community charitable work
        and helps preserve our lodge for future generations.
      </p>
      <p className="text-stone-500 mb-8">
        A receipt has been sent to your email address. If you have questions about your
        donation, please{' '}
        <Link href="/contact" className="text-navy-700 underline">contact us</Link>.
      </p>
      <Link href="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  )
}
