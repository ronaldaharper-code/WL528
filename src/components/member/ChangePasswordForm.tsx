'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  currentPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Required'),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export function ChangePasswordForm() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('saving')
    setErrorMsg('')
    try {
      const res = await fetch('/api/member/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Failed to update password.')
        setStatus('error')
        return
      }
      setStatus('saved')
      reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="cp-current" className="form-label">Current Password</label>
        <input
          id="cp-current"
          type="password"
          autoComplete="current-password"
          {...register('currentPassword')}
          className="form-input"
        />
        {errors.currentPassword && <p className="form-error">{errors.currentPassword.message}</p>}
      </div>

      <div>
        <label htmlFor="cp-new" className="form-label">New Password</label>
        <input
          id="cp-new"
          type="password"
          autoComplete="new-password"
          {...register('newPassword')}
          className="form-input"
          placeholder="Minimum 8 characters"
        />
        {errors.newPassword && <p className="form-error">{errors.newPassword.message}</p>}
      </div>

      <div>
        <label htmlFor="cp-confirm" className="form-label">Confirm New Password</label>
        <input
          id="cp-confirm"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="form-input"
        />
        {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
      </div>

      {status === 'error' && <p className="form-error">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="btn-primary"
      >
        {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Password Updated ✓' : 'Update Password'}
      </button>
    </form>
  )
}
