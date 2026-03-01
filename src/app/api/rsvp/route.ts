import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireMember } from '@/lib/auth'

// POST /api/rsvp — RSVP attending
export async function POST(req: NextRequest) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { eventId } = await req.json().catch(() => ({}))
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })

  const event = await prisma.event.findUnique({ where: { id: eventId } })
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

  // Check capacity
  if (event.maxAttendees) {
    const count = await prisma.rSVP.count({ where: { eventId, status: 'ATTENDING' } })
    if (count >= event.maxAttendees) {
      const rsvp = await prisma.rSVP.upsert({
        where: { userId_eventId: { userId: session.user.id, eventId } },
        create: { userId: session.user.id, eventId, status: 'WAITLIST' },
        update: { status: 'WAITLIST' },
      })
      return NextResponse.json({ rsvp, waitlisted: true })
    }
  }

  const rsvp = await prisma.rSVP.upsert({
    where: { userId_eventId: { userId: session.user.id, eventId } },
    create: { userId: session.user.id, eventId, status: 'ATTENDING' },
    update: { status: 'ATTENDING' },
  })

  return NextResponse.json({ rsvp })
}

// DELETE /api/rsvp — cancel RSVP
export async function DELETE(req: NextRequest) {
  const session = await requireMember()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { eventId } = await req.json().catch(() => ({}))
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })

  await prisma.rSVP.deleteMany({
    where: { userId: session.user.id, eventId },
  })

  return NextResponse.json({ success: true })
}
