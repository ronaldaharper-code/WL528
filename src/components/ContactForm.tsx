'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
  honeypot: z.string().max(0),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
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
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-3xl mb-3" aria-hidden="true">✓</div>
        <h3 className="font-semibold text-green-800 mb-2">Message Sent</h3>
        <p className="text-green-700 text-sm">
          Thank you for reaching out. We will respond within a few business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <input {...register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="contact-name" className="form-label">Name *</label>
        <input id="contact-name" type="text" {...register('name')} className="form-input" autoComplete="name" />
        {errors.name && <p className="form-error">Name is required</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="form-label">Email *</label>
        <input id="contact-email" type="email" {...register('email')} className="form-input" autoComplete="email" />
        {errors.email && <p className="form-error">Valid email required</p>}
      </div>

      <div>
        <label htmlFor="contact-subject" className="form-label">Subject *</label>
        <input id="contact-subject" type="text" {...register('subject')} className="form-input" />
        {errors.subject && <p className="form-error">Subject is required</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">Message *</label>
        <textarea id="contact-message" {...register('message')} rows={5} className="form-textarea" />
        {errors.message && <p className="form-error">Please enter a message</p>}
      </div>

      {status === 'error' && (
        <p className="form-error">
          Unable to submit. Please email us directly at{' '}
          <a href="mailto:TEMPLEBOARD528@gmail.com" className="underline">TEMPLEBOARD528@gmail.com</a>.
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
