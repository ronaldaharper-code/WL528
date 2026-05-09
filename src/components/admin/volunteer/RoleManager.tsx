'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

interface Signup {
  id: string
  user: { id: string; name: string | null; email: string }
}

interface Shift {
  id: string
  date: string
  shiftStart: string | null
  shiftEnd: string | null
  slotsNeeded: number
  signups: Signup[]
}

interface Role {
  id: string
  name: string
  description: string | null
  instructions: string | null
  displayOrder: number
  shifts: Shift[]
}

interface Props {
  eventId: string
  eventStartDate: string   // 'YYYY-MM-DD'
  eventEndDate?: string
  initialRoles: Role[]
}

// ── Role form ────────────────────────────────────────────────────────────────

const BLANK_ROLE = { name: '', description: '', instructions: '', displayOrder: 0 }

function RoleForm({
  initial, onSave, onCancel, loading, error,
}: {
  initial: typeof BLANK_ROLE
  onSave: (d: typeof BLANK_ROLE) => void
  onCancel: () => void
  loading: boolean
  error: string | null
}) {
  const [form, setForm] = useState(initial)
  const set = (k: keyof typeof BLANK_ROLE, v: string | number) =>
    setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input type="text" maxLength={120} required className="input w-full"
            placeholder="e.g. Check-In Table, Setup Crew, Food Support"
            value={form.name} onChange={e => set('name', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1">
            Description
          </label>
          <textarea rows={2} maxLength={500} className="input w-full resize-none"
            placeholder="What does this role involve?"
            value={form.description} onChange={e => set('description', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1">
            Special Instructions
          </label>
          <textarea rows={2} maxLength={1000} className="input w-full resize-none"
            placeholder="Shown to the brother when they sign up (attire, tools to bring, etc.)"
            value={form.instructions} onChange={e => set('instructions', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1">
            Display Order
          </label>
          <input type="number" min={0} className="input w-full" placeholder="Auto"
            value={form.displayOrder || ''} onChange={e => set('displayOrder', parseInt(e.target.value, 10) || 0)} />
        </div>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-2">
        <button type="button" disabled={loading || !form.name.trim()}
          onClick={() => onSave(form)} className="btn btn-primary text-sm disabled:opacity-60">
          {loading ? 'Saving…' : 'Save Role'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary text-sm">Cancel</button>
      </div>
    </div>
  )
}

// ── Shift form ───────────────────────────────────────────────────────────────

const BLANK_SHIFT = { date: '', shiftStart: '', shiftEnd: '', slotsNeeded: 1 }

function ShiftForm({
  initial, onSave, onCancel, loading, error,
}: {
  initial: typeof BLANK_SHIFT
  onSave: (d: typeof BLANK_SHIFT) => void
  onCancel: () => void
  loading: boolean
  error: string | null
}) {
  const [form, setForm] = useState(initial)
  const set = (k: keyof typeof BLANK_SHIFT, v: string | number) =>
    setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="mt-2 bg-navy-50 border border-navy-100 rounded-lg p-4 space-y-3">
      <p className="text-xs font-semibold text-navy-700 uppercase tracking-wide">Add Shift</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs text-stone-600 mb-1">Date <span className="text-red-500">*</span></label>
          <input type="date" required className="input w-full text-sm"
            value={form.date} onChange={e => set('date', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-stone-600 mb-1">Shift Start</label>
          <input type="text" maxLength={20} className="input w-full text-sm" placeholder="9:00 AM"
            value={form.shiftStart} onChange={e => set('shiftStart', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-stone-600 mb-1">Shift End</label>
          <input type="text" maxLength={20} className="input w-full text-sm" placeholder="1:00 PM"
            value={form.shiftEnd} onChange={e => set('shiftEnd', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-stone-600 mb-1">
            How many brothers needed? <span className="text-red-500">*</span>
          </label>
          <input type="number" min={1} max={999} required className="input w-full text-sm"
            value={form.slotsNeeded}
            onChange={e => set('slotsNeeded', parseInt(e.target.value, 10) || 1)} />
        </div>
      </div>
      {error && <p className="text-red-600 text-xs">{error}</p>}
      <div className="flex gap-2">
        <button type="button" disabled={loading || !form.date}
          onClick={() => onSave(form)} className="btn btn-primary text-xs disabled:opacity-60">
          {loading ? 'Adding…' : 'Add Shift'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary text-xs">Cancel</button>
      </div>
    </div>
  )
}

// ── Main RoleManager ─────────────────────────────────────────────────────────

export function RoleManager({ eventId, initialRoles }: Props) {
  const router = useRouter()
  const [roles, setRoles]         = useState<Role[]>(initialRoles)
  const [showAdd, setShowAdd]     = useState(false)
  const [editRoleId, setEditRoleId] = useState<string | null>(null)
  const [addShiftForRole, setAddShiftForRole] = useState<string | null>(null)
  const [confirmDeleteRole, setConfirmDeleteRole]   = useState<string | null>(null)
  const [confirmDeleteShift, setConfirmDeleteShift] = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [roleError, setRoleError] = useState<string | null>(null)
  const [shiftError, setShiftError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // ── Role CRUD ──

  async function addRole(form: typeof BLANK_ROLE) {
    setLoading(true); setRoleError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/events/${eventId}/roles`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, description: form.description || undefined, instructions: form.instructions || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to add role')
      setRoles(r => [...r, { ...data.role, shifts: [] }])
      setShowAdd(false)
    } catch (err: any) { setRoleError(err.message) }
    finally { setLoading(false) }
  }

  async function updateRole(id: string, form: typeof BLANK_ROLE) {
    setLoading(true); setRoleError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/roles/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, description: form.description || undefined, instructions: form.instructions || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to update role')
      setRoles(r => r.map(role => role.id === id ? { ...role, ...data.role } : role))
      setEditRoleId(null)
    } catch (err: any) { setRoleError(err.message) }
    finally { setLoading(false) }
  }

  async function deleteRole(id: string) {
    setLoading(true); setDeleteError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/roles/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to delete role')
      setRoles(r => r.filter(role => role.id !== id))
      setConfirmDeleteRole(null)
    } catch (err: any) { setDeleteError(err.message) }
    finally { setLoading(false) }
  }

  // ── Shift CRUD ──

  async function addShift(roleId: string, form: typeof BLANK_SHIFT) {
    setLoading(true); setShiftError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/roles/${roleId}/shifts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          shiftStart: form.shiftStart || undefined,
          shiftEnd:   form.shiftEnd   || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to add shift')
      const newShift = { ...data.shift, signups: [] }
      setRoles(r => r.map(role =>
        role.id === roleId ? { ...role, shifts: [...role.shifts, newShift] } : role
      ))
      setAddShiftForRole(null)
    } catch (err: any) { setShiftError(err.message) }
    finally { setLoading(false) }
  }

  async function deleteShift(roleId: string, shiftId: string) {
    setLoading(true); setDeleteError(null)
    try {
      const res = await fetch(`/api/admin/volunteer/shifts/${shiftId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to delete shift')
      setRoles(r => r.map(role =>
        role.id === roleId
          ? { ...role, shifts: role.shifts.filter(sh => sh.id !== shiftId) }
          : role
      ))
      setConfirmDeleteShift(null)
    } catch (err: any) { setDeleteError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold text-navy-800">Volunteer Needs</h2>
        {!showAdd && (
          <button onClick={() => { setShowAdd(true); setRoleError(null) }}
            className="btn btn-secondary text-sm">
            + Add Volunteer Role
          </button>
        )}
      </div>

      {showAdd && (
        <RoleForm initial={BLANK_ROLE}
          onSave={addRole}
          onCancel={() => { setShowAdd(false); setRoleError(null) }}
          loading={loading} error={roleError} />
      )}

      {roles.length === 0 && !showAdd && (
        <p className="text-stone-400 text-sm">No roles defined yet. Add a role above, then add shifts to it.</p>
      )}

      <div className="space-y-4">
        {roles.map(role => {
          const totalSlots   = role.shifts.reduce((s, sh) => s + sh.slotsNeeded, 0)
          const totalSignups = role.shifts.reduce((s, sh) => s + sh.signups.length, 0)
          const open         = totalSlots - totalSignups

          return (
            <div key={role.id} className="card p-5">
              {/* Role header */}
              {editRoleId === role.id ? (
                <RoleForm
                  initial={{ name: role.name, description: role.description ?? '', instructions: role.instructions ?? '', displayOrder: role.displayOrder }}
                  onSave={form => updateRole(role.id, form)}
                  onCancel={() => { setEditRoleId(null); setRoleError(null) }}
                  loading={loading} error={roleError} />
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-navy-800">{role.name}</h3>
                        {role.shifts.length > 0 && (
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            open > 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {open > 0 ? `${open} open spot${open > 1 ? 's' : ''}` : 'Fully covered'}
                          </span>
                        )}
                      </div>
                      {role.description && <p className="text-stone-500 text-sm mt-0.5">{role.description}</p>}
                      {role.instructions && <p className="text-stone-400 text-xs mt-1 italic">Instructions: {role.instructions}</p>}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => { setEditRoleId(role.id); setRoleError(null) }}
                        className="text-xs text-navy-600 hover:text-navy-800 px-2 py-1 rounded hover:bg-navy-50 font-medium">
                        Edit
                      </button>
                      {confirmDeleteRole === role.id ? (
                        <>
                          {deleteError && <span className="text-xs text-red-600 self-center">{deleteError}</span>}
                          <button onClick={() => deleteRole(role.id)} disabled={loading}
                            className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-50 font-medium disabled:opacity-60">
                            Confirm Delete
                          </button>
                          <button onClick={() => { setConfirmDeleteRole(null); setDeleteError(null) }}
                            className="text-xs text-stone-500 px-2 py-1 rounded hover:bg-stone-100">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setConfirmDeleteRole(role.id)}
                          className="text-xs text-stone-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Shifts table */}
                  {role.shifts.length > 0 && (
                    <div className="mb-3 rounded-lg border border-stone-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-stone-50 border-b border-stone-200">
                          <tr>
                            <th className="text-left px-3 py-2 text-xs font-semibold text-stone-600">Date</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold text-stone-600">Shift</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold text-stone-600">Open Spots</th>
                            <th className="text-left px-3 py-2 text-xs font-semibold text-stone-600">Signed Up</th>
                            <th className="px-3 py-2"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {role.shifts.map(shift => {
                            const shiftOpen = Math.max(0, shift.slotsNeeded - shift.signups.length)
                            return (
                              <tr key={shift.id} className="hover:bg-stone-50">
                                <td className="px-3 py-2 text-stone-700 font-medium whitespace-nowrap">
                                  {format(new Date(shift.date), 'EEE, MMM d')}
                                </td>
                                <td className="px-3 py-2 text-stone-500 whitespace-nowrap">
                                  {shift.shiftStart && shift.shiftEnd
                                    ? `${shift.shiftStart} – ${shift.shiftEnd}`
                                    : shift.shiftStart ?? '—'}
                                </td>
                                <td className="px-3 py-2">
                                  <span className={`text-xs font-medium ${shiftOpen > 0 ? 'text-amber-700' : 'text-green-700'}`}>
                                    {shiftOpen} / {shift.slotsNeeded}
                                  </span>
                                </td>
                                <td className="px-3 py-2">
                                  <div className="flex flex-wrap gap-1">
                                    {shift.signups.length === 0
                                      ? <span className="text-stone-400 text-xs">None yet</span>
                                      : shift.signups.map(s => (
                                          <span key={s.id} className="text-xs bg-navy-50 text-navy-700 px-1.5 py-0.5 rounded-full border border-navy-100">
                                            {s.user.name ?? s.user.email}
                                          </span>
                                        ))}
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-right whitespace-nowrap">
                                  {confirmDeleteShift === shift.id ? (
                                    <>
                                      {deleteError && <span className="text-xs text-red-600 mr-1">{deleteError}</span>}
                                      <button onClick={() => deleteShift(role.id, shift.id)} disabled={loading}
                                        className="text-xs text-red-600 font-medium mr-1 disabled:opacity-60">Confirm</button>
                                      <button onClick={() => { setConfirmDeleteShift(null); setDeleteError(null) }}
                                        className="text-xs text-stone-500">Cancel</button>
                                    </>
                                  ) : (
                                    <button onClick={() => setConfirmDeleteShift(shift.id)}
                                      className="text-xs text-stone-400 hover:text-red-600">Delete</button>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Add Shift */}
                  {addShiftForRole === role.id ? (
                    <ShiftForm initial={BLANK_SHIFT}
                      onSave={form => addShift(role.id, form)}
                      onCancel={() => { setAddShiftForRole(null); setShiftError(null) }}
                      loading={loading} error={shiftError} />
                  ) : (
                    <button
                      onClick={() => { setAddShiftForRole(role.id); setShiftError(null) }}
                      className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1">
                      + Add Shift
                    </button>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
