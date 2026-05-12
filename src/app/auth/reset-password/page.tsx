'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  if (!token) {
    return (
      <div className="text-center space-y-3">
        <p className="text-red-600 font-medium">Invalid reset link.</p>
        <Link href="/auth/forgot-password" className="text-sm text-navy-700 hover:underline">
          Request a new one
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrorMsg('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('done')
      setTimeout(() => router.push('/auth/signin'), 2500)
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-navy-900">Password updated!</p>
        <p className="text-stone-500 text-sm">Redirecting you to sign in…</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-stone-600 text-sm leading-relaxed">
        Choose a new password for your account.
      </p>

      <div>
        <label htmlFor="rp-password" className="form-label">New Password</label>
        <input
          id="rp-password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="Minimum 8 characters"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="rp-confirm" className="form-label">Confirm New Password</label>
        <input
          id="rp-confirm"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="form-input"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
        />
      </div>

      {(errorMsg || status === 'error') && (
        <p className="form-error">{errorMsg || 'Something went wrong.'}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full"
      >
        {status === 'loading' ? 'Saving…' : 'Set New Password'}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-navy-900">Set New Password</h1>
          <p className="text-stone-500 text-sm mt-1">
            Walled Lake Lodge #528 — Member Portal
          </p>
        </div>
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-8">
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>
        <p className="text-center text-sm text-stone-500 mt-6">
          <Link href="/auth/signin" className="text-navy-700 hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
