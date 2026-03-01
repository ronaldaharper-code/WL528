import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(3000),
  honeypot: z.string().max(0),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 3_600_000 })) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, subject, message } = parsed.data

  // Save to DB first — always, regardless of email availability
  try {
    await prisma.auditLog.create({
      data: {
        action: 'CONTACT_MESSAGE',
        meta: { name, email, subject, message },
      },
    })
  } catch (err) {
    console.error('Failed to save contact message to DB:', err)
  }

  // Best-effort email notification (SMTP may not be configured)
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL ?? '',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })
  } catch (err) {
    console.error('Contact email error (message saved to DB):', err)
    // Do NOT fail the response — message is persisted in the audit log
  }

  return NextResponse.json({ success: true })
}
