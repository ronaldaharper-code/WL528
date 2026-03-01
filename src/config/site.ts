/**
 * SINGLE SOURCE OF TRUTH for all site-wide configuration.
 * Import from here — never hardcode lodge details elsewhere.
 */

export const siteConfig = {
  name: 'Walled Lake Lodge #528 F&AM',
  shortName: 'Lodge #528',
  tagline: 'Brotherly Love, Relief, and Truth',
  description:
    'Walled Lake Lodge #528 Free and Accepted Masons — serving Oakland County, Michigan since 1949.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.walledlakemasons.com',

  // ── Physical Location ────────────────────────────────────────────────────
  address: {
    street: '374 W. Walled Lake Drive',
    city: 'Walled Lake',
    state: 'MI',
    zip: '48390',
    country: 'US',
    /** Full single-line address for display */
    full: '374 W. Walled Lake Drive, Walled Lake, MI 48390',
    /** Formatted multi-line HTML */
    multiLine: ['374 W. Walled Lake Drive', 'Walled Lake, MI 48390'],
  },

  // ── Google Maps embed (no API key required) ──────────────────────────────
  mapEmbedUrl:
    'https://maps.google.com/maps?q=374+W.+Walled+Lake+Drive,+Walled+Lake,+MI+48390&t=&z=15&ie=UTF8&iwloc=&output=embed',

  // ── Contact ──────────────────────────────────────────────────────────────
  phone: '',   // TODO: Confirm lodge phone number
  email: 'secretary@walledlakemasons.com',
  hallRentalEmail: process.env.HALL_RENTAL_EMAIL ?? 'rental@walledlakemasons.com',
  adminEmail: process.env.ADMIN_EMAIL ?? 'secretary@walledlakemasons.com',

  // ── Social ───────────────────────────────────────────────────────────────
  social: {
    facebook: 'https://www.facebook.com/walledlakemasons',
    instagram: '', // TODO: Add Instagram URL when available
    linkedin: '',  // TODO: Add LinkedIn URL when available
  },

  // ── External Links ───────────────────────────────────────────────────────
  grandLodgeUrl: 'https://michiganmasons.org/',

  // ── Lodge Details ────────────────────────────────────────────────────────
  established: 1949,
  lodgeNumber: 528,
  jurisdiction: 'Grand Lodge of Michigan, F&AM',

  // ── Feature Flags ────────────────────────────────────────────────────────
  features: {
    /** Set to false until Stripe is fully configured */
    donationsEnabled:
      !!(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
        process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_WEBHOOK_SECRET
      ),
    /** Set to false until SMTP is configured */
    emailEnabled:
      !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  },
} as const

export type SiteConfig = typeof siteConfig
