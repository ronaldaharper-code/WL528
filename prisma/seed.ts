/**
 * Walled Lake Masons — Database Seed
 * Run: npm run db:seed
 *
 * Creates initial admin user and sample data.
 */

import { PrismaClient, Role, EventVisibility } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ----------------------------------------------------------
  // Admin user
  // ----------------------------------------------------------
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@walledlakemasons.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const hash = await bcrypt.hash(adminPassword, 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Lodge Administrator',
        displayName: 'Lodge Admin',
        passwordHash: hash,
        role: Role.ADMIN,
        approved: true,
        commentApproved: true,
        title: 'Secretary',
      },
    })
    console.log(`Created admin: ${adminEmail}`)
  } else {
    console.log(`Admin already exists: ${adminEmail}`)
  }

  // ----------------------------------------------------------
  // Sample public event
  // ----------------------------------------------------------
  const eventSlug = 'community-open-house-2025'
  const existingEvent = await prisma.event.findUnique({ where: { slug: eventSlug } })
  if (!existingEvent) {
    await prisma.event.create({
      data: {
        title: 'Community Open House',
        slug: eventSlug,
        description:
          'Walled Lake Lodge #528 welcomes the community for an open house. Tour the lodge, meet members, and learn about Freemasonry in our area.',
        startAt: new Date('2025-09-20T13:00:00-04:00'),
        endAt: new Date('2025-09-20T17:00:00-04:00'),
        location: 'Walled Lake Lodge #528',
        address: '1499 N Pontiac Trail, Walled Lake, MI 48390',
        visibility: EventVisibility.PUBLIC,
        maxAttendees: 100,
      },
    })
    console.log('Created sample public event')
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
