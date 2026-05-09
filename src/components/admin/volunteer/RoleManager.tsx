'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Signup {
  id: string
  user: { id: string; name: string | null; email: string }
}

interface Role {
  id: string
  name: string
  description: string | null
  slotsNeeded: number
  shiftStart: string | null
  shiftEnd: string | null
  instructions: string | null
  displayOrder: number
  signups: Signup[]
}

interface Props {
  eventId: string
  initialRoles: Role[]
}

const BLANK_FORM = {
  name: '', description: '', slotsNeeded: 1, shiftStart: '', shiftEnd: '', instructions: '', displayOrder: 0,
}

function RoleForm({
  initial,
  onSave,
  onCancel,
  loading,
  error,
}: {
  initial: typeof BLANK_FORM
  onSave: (data: typeof BLANK_FORM) => void
  onCancel: () => void
  loading: boolean
  error: string | null
}) {
  const [form, setForm] = useState(initial)
  const set = (k: keyof typeof BLANK_FORM, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text" maxLength={120} required className="input w-full"
            placeholder="e.g. Setup Crew"
            value={form.name} onChange={e => set('name', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            Role Description
          </label>
          <textarea
            rows={2} maxLength={500} className="input w-full resize-none"
            placeholder="Brief description of what this role involves"
            value={form.description} onChange={e => set('description', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            How many brothers are needed? <span className="text-red-500">*</span>
          </label>
          <input
            type="number" min={1} max={999} required className="input w-full"
            value={form.slotsNeeded} onChange={e => set('slotsNeeded', parseInt(e.target.value, 10) || 1)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            Display Order
          </label>
          <input
            type="number" min={0} className="input w-full"
            placeholder="Auto"
            value={form.displayOrder || ''} onChange={e => set('displayOrder', parseInt(e.target.value, 10) || 0)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            Shift Start
          </label>
          <input
            type="text" maxLength={20} className="input w-full"
            placeholder="e.g. 9:00 AM"
            value={form.shiftStart} onChange={e => set('shiftStart', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            Shift End
          </label>
          <input
            type="text" maxLength={20} className="input w-full"
            placeholder="e.g. 12:00 PM"
            value={form.shiftEnd} onChange={e => set('shiftEnd', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wide">
            Special Instructions
          </label>
          <textarea
            rows={2} maxLength={1000} className="input w-full resize-none"
            placeholder="Optional instructions shown to the member when they sign up"
            value={form.instructions} onChange={e => set('instructions', e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button" disabled={loading || !form.name.trim()}
          onClick={() => onSave(form)}
          className="btn btn-primary text-sm disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Save Role'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary text-sm">
          Cancel
        </button>
      </div>
    </div>
  )
}

export function RoleManager({ eventId, initialRoles }: Props) {
  const router  = useRouter()
  const [roles, setRoles]       = useState<Role[]>(initialRoles)
  const [showAdd, setShowAdd]   = useState(false)
  const [editId, setEditId]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  async function addRole(form: typeof BLANK_FORM) {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/events/${eventId}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          shiftStart:   form.shiftStart || undefined,
          shiftEnd:     form.shiftEnd || undefined,
          description:  form.description || undefined,
          instructions: form.instructions || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to add role')
      setRoles(r => [...r, { ...data.role, signups: [] }])
      setShowAdd(false)
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  async function updateRole(id: string, form: typeof BLANK_FORM) {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/roles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          shiftStart:   form.shiftStart || undefined,
          shiftEnd:     form.shiftEnd || undefined,
          description:  form.description || undefined,
          instructions: form.instructions || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to update role')
      setRoles(r => r.map(role => role.id === id ? { ...role, ...data.role } : role))
      setEditId(null)
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  async function deleteRole(id: string) {
    setLoading(true); setDeleteError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/roles/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to delete role')
      setRoles(r => r.filter(role => role.id !== id))
      setConfirmDelete(null)
    } catch (err: any) { setDeleteError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold text-navy-800">Volunteer Needs</h2>
        {!showAdd && (
          <button onClick={() => { setShowAdd(true); setError(null) }} className="btn btn-secondary text-sm">
            + Add Volunteer Role
          </button>
        )}
      </div>

      {/* Add form */}
      {showAdd && (
        <RoleForm
          initial={BLANK_FORM}
          onSave={addRole}
          onCancel={() => { setShowAdd(false); setError(null) }}
          loading={loading}
          error={error}
        />
      )}

      {roles.length === 0 && !showAdd && (
        <p className="text-stone-400 text-sm">No volunteer roles defined yet. Add one above.</p>
      )}

      {/* Role cards */}
      <div className="space-y-3">
        {roles.map(role => {
          const open = Math.max(0, role.slotsNeeded - role.signups.length)

          if (editId === role.id) {
            return (
              <div key={role.id}>
                <RoleForm
                  initial={{
                    name: role.name,
                    description: role.description ?? '',
                    slotsNeeded: role.slotsNeeded,
                    shiftStart: role.shiftStart ?? '',
                    shiftEnd: role.shiftEnd ?? '',
                    instructions: role.instructions ?? '',
                    displayOrder: role.displayOrder,
                  }}
                  onSave={form => updateRole(role.id, form)}
                  onCancel={() => { setEditId(null); setError(null) }}
                  loading={loading}
                  error={error}
                />
              </div>
            )
          }

          return (
            <div key={role.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold text-navy-800">{role.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      open > 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {open > 0 ? `${open} open spot${open > 1 ? 's' : ''}` : 'Full'}
                    </span>
                    <span className="text-xs text-stone-400">
                      {role.signups.length} / {role.slotsNeeded} filled
                    </span>
                  </div>
                  {role.description && (
                    <p className="text-stone-500 text-sm mt-1">{role.description}</p>
                  )}
                  {(role.shiftStart || role.shiftEnd) && (
                    <p className="text-stone-400 text-xs mt-1">
                      Shift: {[role.shiftStart, role.shiftEnd].filter(Boolean).join(' – ')}
                    </p>
                  )}
                  {role.instructions && (
                    <p className="text-stone-400 text-xs mt-1 italic">Instructions: {role.instructions}</p>
                  )}

                  {/* Signups list */}
                  {role.signups.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {role.signups.map(s => (
                        <span key={s.id} className="text-xs bg-navy-50 text-navy-700 px-2 py-0.5 rounded-full border border-navy-100">
                          {s.user.name ?? s.user.email}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setEditId(role.id); setError(null) }}
                    className="text-xs text-navy-600 hover:text-navy-800 font-medium px-2 py-1 rounded hover:bg-navy-50"
                  >
                    Edit
                  </button>
                  {confirmDelete === role.id ? (
                    <div className="flex items-center gap-1">
                      {deleteError && <span className="text-xs text-red-600">{deleteError}</span>}
                      <button
                        onClick={() => deleteRole(role.id)}
                        disabled={loading}
                        className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 disabled:opacity-60"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => { setConfirmDelete(null); setDeleteError(null) }}
                        className="text-xs text-stone-500 px-2 py-1 rounded hover:bg-stone-100"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(role.id)}
                      className="text-xs text-stone-400 hover:text-red-600 font-medium px-2 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
