'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-navy-900">Forgot Password</h1>
          <p className="text-stone-500 text-sm mt-1">
            Walled Lake Lodge #528 — Member Portal
          </p>
        </div>

        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
          {status === 'sent' ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-semibold text-navy-900">Check your email</p>
              <p className="text-stone-500 text-sm leading-relaxed">
                If an account exists for <strong>{email}</strong>, we sent a password
                reset link. It expires in 24 hours.
              </p>
              <Link href="/auth/signin" className="text-sm text-navy-700 hover:underline block mt-4">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-stone-600 text-sm leading-relaxed">
                Enter the email address on your account and we will send you a reset link.
              </p>

              <div>
                <label htmlFor="fp-email" className="form-label">Email Address</label>
                <input
                  id="fp-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {status === 'error' && (
                <p className="form-error">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full"
              >
                {status === 'loading' ? 'Sending…' : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-stone-500">
                <Link href="/auth/signin" className="text-navy-700 hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
