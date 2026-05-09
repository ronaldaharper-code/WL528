'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { value: 'minutes',     label: 'Meeting Minutes' },
  { value: 'bylaws',      label: 'Bylaws & Rules' },
  { value: 'forms',       label: 'Forms' },
  { value: 'educational', label: 'Educational' },
  { value: 'reports',     label: 'Reports' },
  { value: 'other',       label: 'Other' },
]

export function DocumentForm() {
  const router = useRouter()
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [category,    setCategory]    = useState('other')
  const [fileUrl,     setFileUrl]     = useState('')
  const [fileName,    setFileName]    = useState('')
  const [saving,      setSaving]      = useState(false)
  const [error,       setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: description || undefined, category, fileUrl, fileName: fileName || undefined }),
    })
    setSaving(false)
    if (!res.ok) { setError('Failed to save. Check the URL and try again.'); return }
    setTitle(''); setDescription(''); setCategory('other'); setFileUrl(''); setFileName('')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="font-serif text-lg font-bold text-navy-800">Add Document</h2>

      <div>
        <label className="form-label">Title *</label>
        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required maxLength={200} />
      </div>

      <div>
        <label className="form-label">Category</label>
        <select className="form-input" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <div>
        <label className="form-label">File URL * <span className="text-stone-400 font-normal">(Google Drive link, Dropbox, or any public URL)</span></label>
        <input className="form-input" type="url" value={fileUrl} onChange={e => setFileUrl(e.target.value)} required placeholder="https://drive.google.com/..." />
      </div>

      <div>
        <label className="form-label">File Name <span className="text-stone-400 font-normal">(optional, e.g. "minutes-jan-2026.pdf")</span></label>
        <input className="form-input" value={fileName} onChange={e => setFileName(e.target.value)} maxLength={200} />
      </div>

      <div>
        <label className="form-label">Description <span className="text-stone-400 font-normal">(optional)</span></label>
        <input className="form-input" value={description} onChange={e => setDescription(e.target.value)} maxLength={500} />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" disabled={saving || !title.trim() || !fileUrl.trim()} className="btn btn-primary">
        {saving ? 'Saving…' : 'Add Document'}
      </button>
    </form>
  )
}
