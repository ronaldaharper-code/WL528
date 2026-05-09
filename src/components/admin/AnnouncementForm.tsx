'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AnnouncementForm() {
  const router = useRouter()
  const [title,   setTitle]   = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body,    setBody]    = useState('')
  const [pinned,  setPinned]  = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt: excerpt || undefined, body: body || undefined, pinned }),
    })
    setSaving(false)
    if (!res.ok) { setError('Failed to save. Please try again.'); return }
    setTitle(''); setExcerpt(''); setBody(''); setPinned(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="font-serif text-lg font-bold text-navy-800">New Announcement</h2>

      <div>
        <label className="form-label">Title *</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required maxLength={200} />
      </div>

      <div>
        <label className="form-label">Excerpt <span className="text-stone-400 font-normal">(short summary shown on dashboard)</span></label>
        <input className="form-input" value={excerpt} onChange={e => setExcerpt(e.target.value)} maxLength={500} />
      </div>

      <div>
        <label className="form-label">Body <span className="text-stone-400 font-normal">(full text — optional)</span></label>
        <textarea className="form-input min-h-[120px]" value={body} onChange={e => setBody(e.target.value)} maxLength={10000} />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} className="rounded" />
        <span className="text-sm text-stone-700">Pin to top of dashboard</span>
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" disabled={saving || !title.trim()} className="btn btn-primary">
        {saving ? 'Saving…' : 'Post Announcement'}
      </button>
    </form>
  )
}
