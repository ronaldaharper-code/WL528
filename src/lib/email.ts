import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface MailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: MailOptions) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    replyTo,
  })
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
