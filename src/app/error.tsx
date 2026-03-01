'use client'

import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-stone-400 text-5xl font-serif mb-4" aria-hidden="true">!</p>
        <h1 className="font-serif text-2xl font-bold text-navy-900 mb-3">Something Went Wrong</h1>
        <p className="text-stone-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Try Again</button>
          <Link href="/" className="btn-secondary">Return Home</Link>
        </div>
      </div>
    </div>
  )
}
