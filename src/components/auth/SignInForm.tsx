'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type ErrorType = 'credentials' | 'pending_approval' | 'server' | null

const ERROR_MESSAGES: Record<NonNullable<ErrorType>, { title: string; body: string }> = {
  credentials: {
    title: 'Invalid email or password.',
    body:  'Please check your credentials and try again.',
  },
  pending_approval: {
    title: 'Account pending approval.',
    body:  'Your account has been created but is awaiting approval from the lodge administrator. You will be notified by email once approved.',
  },
  server: {
    title: 'Login temporarily unavailable.',
    body:  'We encountered a server issue. Please try again in a moment, or contact the lodge if the problem persists.',
  },
}

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/member/dashboard'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const [loading,  setLoading]  = useState(false)
  const [showPw,   setShowPw]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) return
    setLoading(true)
    setErrorType(null)

    try {
      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
        callbackUrl,
      })

      if (!result?.error) {
        // Success — redirect
        router.push(callbackUrl)
        router.refresh()
        return
      }

      // Distinguish server error from credential error
      if (result.error === 'ServerError') {
        setErrorType('server')
        setLoading(false)
        return
      }

      // Failed — check if it's a pending-approval situation
      try {
        const check = await fetch('/api/auth/check-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        })
        const data = await check.json()
        if (data.status === 'pending_approval') {
          setErrorType('pending_approval')
        } else {
          setErrorType('credentials')
        }
      } catch {
        setErrorType('credentials')
      }
    } catch {
      setErrorType('server')
    }

    setLoading(false)
  }

  const err = errorType ? ERROR_MESSAGES[errorType] : null

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Email */}
      <div>
        <label htmlFor="signin-email" className="form-label">Email Address</label>
        <input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="form-input"
          aria-describedby={err ? 'signin-error' : undefined}
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="signin-password" className="form-label mb-0">Password</label>
        </div>
        <div className="relative">
          <input
            id="signin-password"
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="form-input pr-10"
            aria-describedby={err ? 'signin-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            tabIndex={-1}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
          >
            {showPw ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Error alert */}
      {err && (
        <div
          id="signin-error"
          role="alert"
          className={`rounded-xl p-4 text-sm ${
            errorType === 'pending_approval'
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : errorType === 'server'
                ? 'bg-orange-50 border border-orange-200 text-orange-800'
                : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="font-semibold mb-0.5">{err.title}</p>
          <p className="leading-relaxed">{err.body}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !email.trim() || !password}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in…
          </span>
        ) : 'Sign In'}
      </button>
    </form>
  )
}
