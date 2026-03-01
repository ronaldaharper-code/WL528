'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const schema = z
  .object({
    name: z.string().min(2, 'Full name required'),
    email: z.string().email('Valid email required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export function SignUpForm() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    setServerError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Registration failed')
      setStatus('success')
    } catch (err: any) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="text-green-600 text-3xl mb-4" aria-hidden="true">✓</div>
        <h3 className="font-semibold text-navy-800 mb-2">Account Created</h3>
        <p className="text-stone-600 text-sm">
          Your account is pending approval by the lodge administrator.
          You will receive an email when your account is approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="signup-name" className="form-label">Full Name *</label>
        <input id="signup-name" type="text" {...register('name')} autoComplete="name" className="form-input" />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="signup-email" className="form-label">Email Address *</label>
        <input id="signup-email" type="email" {...register('email')} autoComplete="email" className="form-input" />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="signup-password" className="form-label">Password *</label>
        <input id="signup-password" type="password" {...register('password')} autoComplete="new-password" className="form-input" />
        {errors.password && <p className="form-error">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="signup-confirm" className="form-label">Confirm Password *</label>
        <input id="signup-confirm" type="password" {...register('confirmPassword')} autoComplete="new-password" className="form-input" />
        {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
      </div>

      {serverError && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-700 text-sm">{serverError}</p>
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? 'Creating Account…' : 'Create Account'}
      </button>
    </form>
  )
}
