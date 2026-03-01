import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendEmail, hallRentalEmailHtml } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional(),
  eventDate: z.string().min(1),
  eventType: z.string().min(2).max(100),
  guestCount: z.number().min(1).max(125).optional(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit({ key: `hall-rental:${ip}`, limit: 3, windowMs: 3_600_000 })) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const data = parsed.data

  // Save to DB
  await prisma.hallRentalInquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventDate: new Date(data.eventDate),
      eventType: data.eventType,
      guestCount: data.guestCount,
      message: data.message,
    },
  })

  // Send email notification
  try {
    await sendEmail({
      to: process.env.HALL_RENTAL_EMAIL ?? process.env.ADMIN_EMAIL ?? 'TEMPLEBOARD528@gmail.com',
      subject: `Hall Rental Inquiry from ${data.name}`,
      html: hallRentalEmailHtml({
        ...data,
        phone: data.phone,
        guestCount: data.guestCount,
      }),
      replyTo: data.email,
    })
  } catch (err) {
    console.error('Failed to send hall rental email:', err)
    // Don't fail the response — inquiry is saved
  }

  return NextResponse.json({ success: true })
}
