import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gold-500 text-6xl font-serif font-bold mb-4" aria-hidden="true">404</p>
        <h1 className="font-serif text-2xl font-bold text-navy-900 mb-3">Page Not Found</h1>
        <p className="text-stone-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">Return Home</Link>
      </div>
    </div>
  )
}
