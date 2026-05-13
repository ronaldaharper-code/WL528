import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM    = 'Walled Lake Lodge #528 <noreply@walledlakemasons.org>'
const LODGE   = 'walledlakemasons528@gmail.com'

export async function sendEmail({ subject, html, to }: { subject: string; html: string; to?: string }) {
  return resend.emails.send({ from: FROM, to: to ?? LODGE, subject, html })
}

export function passwordResetHtml(name: string, resetUrl: string) {
  return `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
  <h2 style="color:#1e3a5f">Reset Your Password — Walled Lake Lodge #528</h2>
  <p>Hi ${name},</p>
  <p>A password reset was requested for your member portal account. Click the button below to set a new password. This link expires in <strong>24 hours</strong>.</p>
  <p style="margin:28px 0">
    <a href="${resetUrl}" style="background:#1e3a5f;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">
      Reset My Password
    </a>
  </p>
  <p style="color:#78716c;font-size:13px">If you did not request this reset, you can safely ignore this email — your password will not change.</p>
  <p style="color:#78716c;font-size:13px">Or copy this link into your browser:<br>${resetUrl}</p>
</div>
`
}

export function newMemberSignupHtml(name: string, email: string) {
  return `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
  <h2 style="color:#1e3a5f">New Member Request — Walled Lake Lodge #528</h2>
  <p>A new member has requested portal access:</p>
  <table cellpadding="6">
    <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
    <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  </table>
  <p>Log in to the admin panel to approve or deny this request.</p>
</div>
`
}

export function memberApprovedHtml(name: string, email: string) {
  return `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
  <h2 style="color:#1e3a5f">Member Approved — Walled Lake Lodge #528</h2>
  <p>The following member has been approved and can now access the portal:</p>
  <table cellpadding="6">
    <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
    <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  </table>
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
