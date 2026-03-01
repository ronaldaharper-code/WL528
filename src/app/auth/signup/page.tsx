import type { Metadata } from 'next'
import { SignUpForm } from '@/components/auth/SignUpForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Member Account',
  robots: { index: false },
}

export default function SignUpPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-navy-900">Create Your Account</h1>
          <p className="text-stone-500 text-sm mt-1">
            Walled Lake Lodge #528 — Member Portal
          </p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
          <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Your account will require approval by a lodge administrator
              before you can access the member portal. You will be notified by email when approved.
            </p>
          </div>

          <SignUpForm />

          <p className="text-center text-stone-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-navy-700 hover:text-navy-900 underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
