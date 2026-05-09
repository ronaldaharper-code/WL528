import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Walled Lake Lodge #528 <onboarding@resend.dev>'

interface MailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: MailOptions) {
  return resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    replyTo,
  })
}

export function approvalEmailHtml(name: string) {
  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wl-528.vercel.app'}/auth/signin`
  return `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
  <h2 style="color:#1e3a5f">Walled Lake Lodge #528 — Member Portal</h2>
  <p>Hi ${name},</p>
  <p>Your member account has been approved. You can now log in to access the member portal, calendar, and lodge resources.</p>
  <p style="margin:24px 0">
    <a href="${loginUrl}"
       style="background:#1e3a5f;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">
      Sign In to the Member Portal
    </a>
  </p>
  <p style="color:#78716c;font-size:13px">
    If you have any questions, reply to this email or contact the lodge secretary.
  </p>
  <p style="color:#78716c;font-size:13px">— Walled Lake Lodge #528</p>
</div>
`
}

export function hallRentalEmailHtml(data: {
  name: string
  email: string
  phone?: string
  eventDate: string
  eventType: string
  guestCount?: number
  message: string
}) {
  return `
<h2>New Hall Rental Inquiry</h2>
<table cellpadding="6">
  <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
  <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
  <tr><td><strong>Phone:</strong></td><td>${data.phone ?? '—'}</td></tr>
  <tr><td><strong>Event Date:</strong></td><td>${data.eventDate}</td></tr>
  <tr><td><strong>Event Type:</strong></td><td>${data.eventType}</td></tr>
  <tr><td><strong>Guest Count:</strong></td><td>${data.guestCount ?? '—'}</td></tr>
</table>
<p><strong>Message:</strong></p>
<p>${data.message.replace(/\n/g, '<br>')}</p>
`
}
