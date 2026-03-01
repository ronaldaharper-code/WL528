'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommentStatus } from '@prisma/client'

interface Props {
  commentId: string
  status: CommentStatus
}

export function AdminCommentActions({ commentId, status }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const update = async (newStatus: CommentStatus) => {
    setLoading(true)
    await fetch(`/api/admin/comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      {status === 'PENDING' && (
        <button
          type="button"
          disabled={loading}
          onClick={() => update('APPROVED')}
          className="text-xs bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
        >
          Approve
        </button>
      )}
      {status !== 'REMOVED' && (
        <button
          type="button"
          disabled={loading}
          onClick={() => update('REMOVED')}
          className="text-xs bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700"
        >
          Remove
        </button>
      )}
    </div>
  )
}
