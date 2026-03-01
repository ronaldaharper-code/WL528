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

  const action = async (payload: object) => {
    setLoading(true)
    await fetch(`/api/admin/members/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="flex flex-wrap gap-2">
      {!approved && (
        <button
          type="button"
          disabled={loading}
          onClick={() => action({ approved: true })}
          className="text-xs bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
        >
          Approve
        </button>
      )}
      {approved && role !== Role.ADMIN && (
        <button
          type="button"
          disabled={loading}
          onClick={() => action({ role: Role.ADMIN })}
          className="text-xs bg-navy-700 text-white rounded px-3 py-1 hover:bg-navy-800"
        >
          Make Admin
        </button>
      )}
      {approved && role === Role.ADMIN && (
        <button
          type="button"
          disabled={loading}
          onClick={() => action({ role: Role.MEMBER })}
          className="text-xs border border-stone-300 text-stone-600 rounded px-3 py-1 hover:bg-stone-100"
        >
          Remove Admin
        </button>
      )}
    </div>
  )
}
