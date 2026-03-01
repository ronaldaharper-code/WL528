'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  eventDate: z.string().min(1, 'Event date is required'),
  eventType: z.string().min(2, 'Event type is required'),
  guestCount: z.number({ coerce: true }).min(1).max(125).optional(),
  message: z.string().min(10, 'Please provide some details about your event'),
  honeypot: z.string().max(0, 'Bot detected'),
})

type FormData = z.infer<typeof schema>

export function HallRentalForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/hall-rental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-4xl mb-4" aria-hidden="true">✓</div>
        <h3 className="font-semibold text-navy-800 mb-2">Inquiry Received</h3>
        <p className="text-stone-600 text-sm">
          Thank you for your interest. We will be in touch within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="form-label">Full Name *</label>
        <input id="name" type="text" {...register('name')} className="form-input" autoComplete="name" />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email Address *</label>
        <input id="email" type="email" {...register('email')} className="form-input" autoComplete="email" />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="form-label">Phone (optional)</label>
        <input id="phone" type="tel" {...register('phone')} className="form-input" autoComplete="tel" />
      </div>

      <div>
        <label htmlFor="eventDate" className="form-label">Desired Event Date *</label>
        <input id="eventDate" type="date" {...register('eventDate')} className="form-input" />
        {errors.eventDate && <p className="form-error">{errors.eventDate.message}</p>}
      </div>

      <div>
        <label htmlFor="eventType" className="form-label">Type of Event *</label>
        <input
          id="eventType"
          type="text"
          {...register('eventType')}
          placeholder="e.g. Birthday party, reunion, meeting"
          className="form-input"
        />
        {errors.eventType && <p className="form-error">{errors.eventType.message}</p>}
      </div>

      <div>
        <label htmlFor="guestCount" className="form-label">Estimated Guest Count</label>
        <input id="guestCount" type="number" min={1} max={125} {...register('guestCount')} className="form-input" />
        <p className="text-stone-400 text-xs mt-1">Max capacity: 125 guests</p>
      </div>

      <div>
        <label htmlFor="message" className="form-label">Tell Us About Your Event *</label>
        <textarea id="message" {...register('message')} className="form-textarea" rows={4} />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
