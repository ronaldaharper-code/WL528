'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

function formatMasonicDate(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const schema = z.object({
  name: z.string().min(2),
  displayName: z.string().optional(),
  phone: z.string().optional().refine(
    val => !val || val.replace(/\D/g, '').length === 10,
    { message: 'Phone must be 10 digits' }
  ),
  bio: z.string().max(500).optional(),
  title: z.string().optional(),
  joinedLodge: z.string().optional(),
  eaDate: z.string().optional().refine(
    val => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
    { message: 'Use MM/DD/YYYY format' }
  ),
  fcDate: z.string().optional().refine(
    val => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
    { message: 'Use MM/DD/YYYY format' }
  ),
  mmDate: z.string().optional().refine(
    val => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
    { message: 'Use MM/DD/YYYY format' }
  ),
  profileVisible: z.boolean(),
})

type FormData = z.infer<typeof schema>

interface Props {
  user: {
    id: string
    name: string | null
    displayName: string | null
    email: string
    phone: string | null
    bio: string | null
    title: string | null
    joinedLodge: string | null
    eaDate: string | null
    fcDate: string | null
    mmDate: string | null
    profileVisible: boolean
  }
}

export function ProfileForm({ user }: Props) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? '',
      displayName: user.displayName ?? '',
      phone: user.phone ? formatPhone(user.phone) : '',
      bio: user.bio ?? '',
      title: user.title ?? '',
      joinedLodge: user.joinedLodge ?? '',
      eaDate: user.eaDate ?? '',
      fcDate: user.fcDate ?? '',
      mmDate: user.mmDate ?? '',
      profileVisible: user.profileVisible,
    },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('saving')
    try {
      const res = await fetch('/api/member/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="form-label text-stone-400 text-xs">Email (read-only)</label>
        <p className="text-stone-600 text-sm">{user.email}</p>
      </div>

      <div>
        <label htmlFor="profile-name" className="form-label">Full Name</label>
        <input id="profile-name" type="text" {...register('name')} className="form-input" />
        {errors.name && <p className="form-error">Name is required</p>}
      </div>

      <div>
        <label htmlFor="profile-display" className="form-label">Display Name (shown in directory)</label>
        <input id="profile-display" type="text" {...register('displayName')} className="form-input"
               placeholder="e.g. Bro. John Smith" />
      </div>

      <div>
        <label htmlFor="profile-title" className="form-label">Lodge Title / Officer Position</label>
        <input id="profile-title" type="text" {...register('title')} className="form-input"
               placeholder="e.g. Past Master, Senior Deacon" />
      </div>

      <div>
        <label htmlFor="profile-phone" className="form-label">Phone (members-only)</label>
        <input
          id="profile-phone"
          type="tel"
          {...register('phone')}
          onChange={(e) => setValue('phone', formatPhone(e.target.value), { shouldValidate: true })}
          className="form-input"
          placeholder="(555) 555-5555"
        />
        {errors.phone && <p className="form-error">Enter a valid 10-digit phone number</p>}
      </div>

      <div>
        <label htmlFor="profile-joined" className="form-label">Year Joined Lodge</label>
        <input id="profile-joined" type="text" {...register('joinedLodge')} className="form-input"
               placeholder="e.g. 2015" />
      </div>

      <div>
        <label htmlFor="profile-ea" className="form-label">Entered Apprentice Date</label>
        <input
          id="profile-ea"
          type="text"
          inputMode="numeric"
          {...register('eaDate')}
          onChange={(e) => setValue('eaDate', formatMasonicDate(e.target.value), { shouldValidate: true })}
          className="form-input"
          placeholder="MM/DD/YYYY"
        />
        {errors.eaDate && <p className="form-error">Use MM/DD/YYYY format</p>}
      </div>

      <div>
        <label htmlFor="profile-fc" className="form-label">Fellowcraft Date</label>
        <input
          id="profile-fc"
          type="text"
          inputMode="numeric"
          {...register('fcDate')}
          onChange={(e) => setValue('fcDate', formatMasonicDate(e.target.value), { shouldValidate: true })}
          className="form-input"
          placeholder="MM/DD/YYYY"
        />
        {errors.fcDate && <p className="form-error">Use MM/DD/YYYY format</p>}
      </div>

      <div>
        <label htmlFor="profile-mm" className="form-label">Master Mason Date</label>
        <input
          id="profile-mm"
          type="text"
          inputMode="numeric"
          {...register('mmDate')}
          onChange={(e) => setValue('mmDate', formatMasonicDate(e.target.value), { shouldValidate: true })}
          className="form-input"
          placeholder="MM/DD/YYYY"
        />
        {errors.mmDate && <p className="form-error">Use MM/DD/YYYY format</p>}
      </div>

      <div>
        <label htmlFor="profile-bio" className="form-label">Short Bio (max 500 characters)</label>
        <textarea id="profile-bio" {...register('bio')} rows={3} className="form-textarea"
                  placeholder="A few words about yourself" />
        {errors.bio && <p className="form-error">Bio is too long</p>}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="profile-visible"
          type="checkbox"
          {...register('profileVisible')}
          className="w-4 h-4 rounded border-stone-300 text-navy-700 focus:ring-navy-500"
        />
        <label htmlFor="profile-visible" className="text-sm text-stone-700">
          Show my profile in the member directory
        </label>
      </div>

      {status === 'error' && <p className="form-error">Failed to save. Please try again.</p>}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="btn-primary"
      >
        {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save Profile'}
      </button>
    </form>
  )
}
