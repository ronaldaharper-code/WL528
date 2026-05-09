import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { format } from 'date-fns'

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const event = await prisma.volunteerEvent.findUnique({
    where: { id },
    include: {
      roles: {
        orderBy: { displayOrder: 'asc' },
        include: {
          shifts: {
            orderBy: { date: 'asc' },
            include: {
              signups: {
                include: { user: { select: { name: true, email: true, phone: true } } },
                orderBy: { createdAt: 'asc' },
              },
            },
          },
        },
      },
    },
  })

  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const rows: string[][] = [
    ['Role', 'Date', 'Shift', 'Slots Needed', 'Open Spots', 'Member Name', 'Email', 'Phone'],
  ]

  for (const role of event.roles) {
    for (const shift of role.shifts) {
      const open      = Math.max(0, shift.slotsNeeded - shift.signups.length)
      const dateStr   = format(new Date(shift.date), 'EEE MMM d yyyy')
      const shiftTime = [shift.shiftStart, shift.shiftEnd].filter(Boolean).join(' - ')

      if (shift.signups.length === 0) {
        rows.push([role.name, dateStr, shiftTime, String(shift.slotsNeeded), String(open), '', '', ''])
      } else {
        for (const s of shift.signups) {
          rows.push([
            role.name,
            dateStr,
            shiftTime,
            String(shift.slotsNeeded),
            String(open),
            s.user.name ?? '',
            s.user.email,
            s.user.phone ?? '',
          ])
        }
      }
    }
  }

  const csv      = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
  const filename = `volunteers-${event.title.replace(/\s+/g, '-').toLowerCase()}.csv`

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
