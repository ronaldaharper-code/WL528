import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM    = 'Walled Lake Lodge #528 <onboarding@resend.dev>'
const LODGE   = 'walledlakemasons528@gmail.com'

export async function sendEmail({ subject, html }: { subject: string; html: string }) {
  return resend.emails.send({ from: FROM, to: LODGE, subject, html })
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
