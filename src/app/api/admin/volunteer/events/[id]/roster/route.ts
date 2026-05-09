import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

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
          signups: {
            include: { user: { select: { name: true, email: true, phone: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  })

  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Build CSV
  const rows: string[][] = [
    ['Role', 'Shift', 'Slots Needed', 'Open Spots', 'Member Name', 'Email', 'Phone', 'Signed Up'],
  ]

  for (const role of event.roles) {
    const open = Math.max(0, role.slotsNeeded - role.signups.length)
    const shift = [role.shiftStart, role.shiftEnd].filter(Boolean).join(' – ')

    if (role.signups.length === 0) {
      rows.push([role.name, shift, String(role.slotsNeeded), String(open), '', '', '', ''])
    } else {
      for (const s of role.signups) {
        rows.push([
          role.name,
          shift,
          String(role.slotsNeeded),
          String(open),
          s.user.name ?? '',
          s.user.email,
          s.user.phone ?? '',
          s.createdAt.toISOString(),
        ])
      }
    }
  }

  const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
  const filename = `volunteers-${event.title.replace(/\s+/g, '-').toLowerCase()}.csv`

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
