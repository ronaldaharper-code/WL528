'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function CreateEventForm() {
  const router = useRouter()
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [isExternal, setIsExternal] = useState(false)
  const [isMultiDay, setIsMultiDay] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)

    const body = {
      title:       fd.get('title') as string,
      description: fd.get('description') as string || undefined,
      startDate:   fd.get('startDate') as string,
      endDate:     isMultiDay ? (fd.get('endDate') as string || undefined) : undefined,
      location:    fd.get('location') as string || undefined,
      isExternal:  fd.get('isExternal') === 'on',
      hostOrg:     fd.get('hostOrg') as string || undefined,
      published:   fd.get('published') !== null,
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/volunteer/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to create event')
      router.push(`/admin/volunteer/${data.event.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Event Title <span className="text-red-500">*</span>
        </label>
        <input name="title" type="text" required maxLength={200} className="input w-full"
          placeholder="e.g. Charity Poker Night" />
      </div>

      {/* Date range */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <input
            id="isMultiDay" type="checkbox"
            className="h-4 w-4 rounded border-stone-300 text-navy-600"
            checked={isMultiDay} onChange={e => setIsMultiDay(e.target.checked)}
          />
          <label htmlFor="isMultiDay" className="text-sm text-stone-700">
            This is a multi-day event
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              {isMultiDay ? 'Start Date' : 'Event Date'} <span className="text-red-500">*</span>
            </label>
            <input name="startDate" type="date" required className="input w-full" />
          </div>
          {isMultiDay && (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">End Date</label>
              <input name="endDate" type="date" className="input w-full" />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Location</label>
        <input name="location" type="text" maxLength={200} className="input w-full"
          placeholder="e.g. Lodge Hall, Downtown Walled Lake" />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
        <textarea name="description" rows={3} maxLength={2000} className="input w-full resize-none"
          placeholder="Optional event description visible to members" />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isExternal" name="isExternal" type="checkbox"
          className="h-4 w-4 rounded border-stone-300 text-navy-600"
          checked={isExternal} onChange={e => setIsExternal(e.target.checked)}
        />
        <label htmlFor="isExternal" className="text-sm text-stone-700">
          External event — Lodge is providing volunteers only
        </label>
      </div>

      {isExternal && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Hosting Organization</label>
          <input name="hostOrg" type="text" maxLength={200} className="input w-full"
            placeholder="e.g. Walled Lake Community Foundation" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          id="published" name="published" type="checkbox" defaultChecked
          className="h-4 w-4 rounded border-stone-300 text-navy-600"
        />
        <label htmlFor="published" className="text-sm text-stone-700">
          Published — visible to members immediately
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-60">
        {loading ? 'Creating…' : 'Create Event & Add Roles →'}
      </button>
    </form>
  )
}
