'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  shiftId: string
  signupId: string | null
  isFull: boolean
}

export function SignupButton({ shiftId, signupId, isFull }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleSignup() {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/member/volunteer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shiftId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Could not sign up')
      router.refresh()
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  async function handleRemove() {
    if (!signupId) return
    setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/member/volunteer/signup/${signupId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Could not remove signup')
      router.refresh()
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  if (signupId) {
    return (
      <div className="text-right">
        <button onClick={handleRemove} disabled={loading}
          className="text-xs text-stone-400 hover:text-red-600 underline underline-offset-2 disabled:opacity-60">
          {loading ? 'Removing…' : 'Remove'}
        </button>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }

  if (isFull) {
    return (
      <span className="text-xs text-stone-400 font-medium px-3 py-1.5 rounded-lg bg-stone-100">Full</span>
    )
  }

  return (
    <div className="text-right">
      <button onClick={handleSignup} disabled={loading}
        className="btn btn-primary text-sm disabled:opacity-60">
        {loading ? 'Signing Up…' : 'Sign Up'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1 max-w-[160px]">{error}</p>}
    </div>
  )
}
