import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sanityClient } from '@/lib/sanity'
import { generateICS } from '@/lib/ics'

interface Params { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params

  // Try DB first
  let event = await prisma.event.findUnique({ where: { id } })

  if (!event) {
    // Try Sanity
    const sanityEvent = await sanityClient.fetch(
      `*[_type == "event" && _id == "${id}"][0]{ _id, title, startAt, endAt, location, description }`
    ).catch(() => null)

    if (!sanityEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const ics = generateICS({
      uid: sanityEvent._id,
      title: sanityEvent.title,
      startAt: new Date(sanityEvent.startAt),
      endAt: sanityEvent.endAt ? new Date(sanityEvent.endAt) : null,
      location: sanityEvent.location,
    })

    return new NextResponse(ics, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="event.ics"`,
      },
    })
  }

  const ics = generateICS({
    uid: event.icsUid,
    title: event.title,
    startAt: event.startAt,
    endAt: event.endAt,
    location: event.location,
    description: event.description,
  })

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.slug}.ics"`,
    },
  })
}
