'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export function PhotoUploadForm() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) { setPreview(null); return }
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const file = fileRef.current?.files?.[0]
    if (!file) { setError('Please select an image file.'); return }

    setLoading(true)
    try {
      const fd = new FormData(form)
      const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Upload failed')
      }
      form.reset()
      setPreview(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="font-serif text-lg font-bold text-navy-800">Upload Photo</h2>

      {/* File picker */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Image file <span className="text-stone-400 font-normal">(JPEG, PNG, WebP · max ~4 MB)</span>
        </label>
        <input
          ref={fileRef}
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          onChange={handleFileChange}
          className="block w-full text-sm text-stone-600
                     file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                     file:text-sm file:font-medium file:bg-navy-50 file:text-navy-700
                     hover:file:bg-navy-100"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="rounded-xl overflow-hidden border border-stone-200 max-h-48 w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="max-h-48 object-contain" />
        </div>
      )}

      {/* Optional fields */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Title (optional)</label>
        <input
          name="title"
          type="text"
          maxLength={120}
          placeholder="e.g. Annual Banquet 2025"
          className="input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Caption (optional)</label>
        <textarea
          name="caption"
          rows={2}
          maxLength={300}
          placeholder="Short description shown below the photo"
          className="input w-full resize-none"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary disabled:opacity-60"
      >
        {loading ? 'Uploading…' : 'Upload Photo'}
      </button>
    </form>
  )
}
