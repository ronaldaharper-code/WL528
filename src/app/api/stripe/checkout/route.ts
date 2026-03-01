import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // If Stripe is not configured, don't crash builds/deploys.
  if (!stripe) {
    return NextResponse.json({ ok: true, skipped: 'stripe-not-configured' }, { status: 200 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  // TODO: later you can handle event.type and write to DB
  return NextResponse.json({ received: true, type: event.type }, { status: 200 })
}