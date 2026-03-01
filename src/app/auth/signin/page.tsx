import type { Metadata } from 'next'
import { SignInForm } from '@/components/auth/SignInForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Member Login',
  description: 'Sign in to the Walled Lake Lodge #528 member portal.',
  robots: { index: false },
}

export default function SignInPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-gold-400 font-serif font-bold text-xl">G</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Member Login</h1>
          <p className="text-stone-500 text-sm mt-1">
            Walled Lake Lodge #528 — Member Portal
          </p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
          <SignInForm />
          <p className="text-center text-stone-500 text-sm mt-6">
            New member?{' '}
            <Link href="/auth/signup" className="text-navy-700 hover:text-navy-900 underline">
              Create your account
            </Link>
          </p>
        </div>

        <p className="text-center text-stone-400 text-xs mt-6">
          This portal is for lodge members only.
        </p>
      </div>
    </div>
  )
}
