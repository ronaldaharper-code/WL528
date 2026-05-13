'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Role } from '@prisma/client'

interface Props {
  memberId: string
  approved: boolean
  role: Role
}

export function AdminMemberActions({ memberId, approved, role }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [resetUrl, setResetUrl] = useState<string | null>(null)
  const [emailOk, setEmailOk] = useState<boolean | null>(null)
  const [confirmRemove, setConfirmRemove] = useState(false)

  const patch = async (payload: object) => {
    setLoading(true)
    await fetch(`/api/admin/members/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setLoading(false)
    router.refresh()
  }

  const sendReset = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/members/${memberId}/reset-password`, { method: 'POST' })
    const data = await res.json().catch(() => ({}))
    setLoading(false)
    setEmailOk(data.emailOk ?? false)
    setResetUrl(data.resetUrl ?? null)
  }

  const removeMember = async () => {
    setLoading(true)
    await fetch(`/api/admin/members/${memberId}`, { method: 'DELETE' })
    setLoading(false)
    setConfirmRemove(false)
    router.refresh()
  }

  if (confirmRemove) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-red-700 font-medium">Remove this member?</span>
        <button
          type="button"
          disabled={loading}
          onClick={removeMember}
          className="text-xs bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700"
        >
          Yes, Remove
        </button>
        <button
          type="button"
          onClick={() => setConfirmRemove(false)}
          className="text-xs border border-stone-300 text-stone-600 rounded px-3 py-1 hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    )
  }

  if (resetUrl) {
    return (
      <div className="space-y-2">
        <p className={`text-xs font-medium ${emailOk ? 'text-green-700' : 'text-amber-700'}`}>
          {emailOk ? 'Reset email sent.' : 'Email delivery failed — share this link manually:'}
        </p>
        <input
          readOnly
          value={resetUrl}
          onClick={(e) => (e.target as HTMLInputElement).select()}
          className="text-xs border border-stone-300 rounded px-2 py-1 w-full font-mono bg-stone-50"
        />
        <button
          type="button"
          onClick={() => { setResetUrl(null); setEmailOk(null) }}
          className="text-xs text-stone-500 hover:underline"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {!approved && (
        <button
          type="button"
          disabled={loading}
          onClick={() => patch({ approved: true })}
          className="text-xs bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
        >
          Approve
        </button>
      )}
      {approved && role !== Role.ADMIN && (
        <button
          type="button"
          disabled={loading}
          onClick={() => patch({ role: Role.ADMIN })}
          className="text-xs bg-navy-700 text-white rounded px-3 py-1 hover:bg-navy-800"
        >
          Make Admin
        </button>
      )}
      {approved && role === Role.ADMIN && (
        <button
          type="button"
          disabled={loading}
          onClick={() => patch({ role: Role.MEMBER })}
          className="text-xs border border-stone-300 text-stone-600 rounded px-3 py-1 hover:bg-stone-100"
        >
          Remove Admin
        </button>
      )}
      {approved && !resetUrl && (
        <button
          type="button"
          disabled={loading}
          onClick={sendReset}
          className="text-xs border border-navy-300 text-navy-700 rounded px-3 py-1 hover:bg-navy-50"
        >
          {loading ? 'Generating…' : 'Send Password Reset'}
        </button>
      )}
      <button
        type="button"
        disabled={loading}
        onClick={() => setConfirmRemove(true)}
        className="text-xs border border-red-200 text-red-600 rounded px-3 py-1 hover:bg-red-50"
      >
        Remove
      </button>
    </div>
  )
}
