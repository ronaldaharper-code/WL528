'use client'

import { useState } from 'react'
import { DONATION_PRESETS } from '@/lib/stripe'

export function DonationForm() {
  const [selected, setSelected] = useState<number | null>(50)
  const [custom, setCustom] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const amount = custom ? Math.round(parseFloat(custom) * 100) : (selected ? selected * 100 : 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (amount < 100) {
      setError('Minimum donation is $1.00')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, donorName: name, donorEmail: email, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to create checkout session')
      window.location.href = data.url
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Preset amounts */}
      <div>
        <label className="form-label">Select an Amount</label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {DONATION_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => { setSelected(preset); setCustom('') }}
              className={`rounded border py-2 text-sm font-medium transition-colors ${
                selected === preset && !custom
                  ? 'bg-navy-700 border-navy-700 text-white'
                  : 'border-stone-300 text-stone-700 hover:border-navy-400 hover:bg-navy-50'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
          <input
            type="number"
            min={1}
            step="0.01"
            placeholder="Other amount"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
            className="form-input pl-7"
          />
        </div>
      </div>

      {/* Donor info */}
      <div>
        <label htmlFor="donor-name" className="form-label">Your Name (optional)</label>
        <input
          id="donor-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="donor-email" className="form-label">Email (optional — for receipt)</label>
        <input
          id="donor-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="donor-message" className="form-label">Message (optional)</label>
        <textarea
          id="donor-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="form-textarea"
          placeholder="In honor of, in memory of, etc."
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button
        type="submit"
        disabled={loading || amount < 100}
        className="btn-primary w-full bg-gold-500 hover:bg-gold-600 text-navy-900 text-base py-3"
      >
        {loading
          ? 'Redirecting…'
          : amount >= 100
            ? `Donate $${(amount / 100).toFixed(2)}`
            : 'Select an Amount'}
      </button>
    </form>
  )
}
