'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { SignInForm } from '@/components/auth/SignInForm'

export default function SignInClient() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-navy-900">Member Sign In</h1>
          <p className="text-stone-500 text-sm mt-1">
            Walled Lake Lodge #528 — Member Portal
          </p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
          <Suspense>
            <SignInForm />
          </Suspense>

          <div className="mt-6 pt-6 border-t border-stone-100 text-center space-y-2">
            <p className="text-stone-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-navy-700 hover:text-navy-900 underline">
                Request Access
              </Link>
            </p>
            <p className="text-stone-400 text-xs">
              Need help?{' '}
              <a
                href="mailto:walledlakemasons528@gmail.com"
                className="text-navy-600 hover:underline"
              >
                Contact the lodge
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
