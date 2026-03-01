'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2),
  displayName: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),
  title: z.string().optional(),
  joinedLodge: z.string().optional(),
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
    profileVisible: boolean
  }
}

export function ProfileForm({ user }: Props) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? '',
      displayName: user.displayName ?? '',
      phone: user.phone ?? '',
      bio: user.bio ?? '',
      title: user.title ?? '',
      joinedLodge: user.joinedLodge ?? '',
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
        <input id="profile-phone" type="tel" {...register('phone')} className="form-input" />
      </div>

      <div>
        <label htmlFor="profile-joined" className="form-label">Year Joined Lodge</label>
        <input id="profile-joined" type="text" {...register('joinedLodge')} className="form-input"
               placeholder="e.g. 2015" />
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
