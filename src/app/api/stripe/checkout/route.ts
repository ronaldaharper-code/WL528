import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

const schema = z.object({
  amount: z.number().int().min(100).max(5_000_000), // cents, max $50k
  donorName: z.string().max(100).optional(),
  donorEmail: z.string().email().optional().or(z.literal('')),
  message: z.string().max(500).optional(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  if (!rateLimit({ key: `stripe:${ip}`, limit: 10, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  // If Stripe is not configured, fail gracefully
  if (!stripe) {
    return NextResponse.json(
      { error: 'Donations are not enabled yet.' },
      { status: 501 }
    )
  }

  const session = await auth()
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { amount, donorName, donorEmail, message } = parsed.data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Donation — Walled Lake Lodge #528 F&AM',
            description:
              message ||
              'Supporting lodge operations and community charitable work.',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_email: donorEmail || undefined,
    success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/donate`,
    metadata: {
      donorName: donorName ?? '',
      message: message ?? '',
      userId: session?.user?.id ?? '',
    },
  })

  await prisma.donation.create({
    data: {
      stripeSessionId: checkoutSession.id,
      amount,
      donorName,
      donorEmail: donorEmail || undefined,
      message,
      userId: session?.user?.id,
      status: 'PENDING',
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}