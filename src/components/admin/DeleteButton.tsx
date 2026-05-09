'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteButton({ endpoint, label = 'Delete', redirectTo }: { endpoint: string; label?: string; redirectTo?: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading,    setLoading]    = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await fetch(endpoint, { method: 'DELETE' })
    setLoading(false)
    setConfirming(false)
    if (redirectTo) router.push(redirectTo)
    else router.refresh()
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <span className="text-sm text-stone-600">Sure?</span>
        <button onClick={handleDelete} disabled={loading} className="text-sm text-red-600 hover:text-red-800 font-medium">
          {loading ? 'Deleting…' : 'Yes, delete'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-sm text-stone-500 hover:text-stone-700">
          Cancel
        </button>
      </span>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-sm text-red-500 hover:text-red-700">
      {label}
    </button>
  )
}
