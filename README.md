# Walled Lake Lodge #528 F&AM — Website

Production-ready website and member portal for Walled Lake Lodge #528, Free and Accepted Masons.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma ORM |
| Authentication | NextAuth / Auth.js v5 (Credentials) |
| CMS | Sanity v3 |
| Payments | Stripe |
| Analytics | Google Analytics GA4 |
| Deploy | Vercel |
| Email | Nodemailer (SMTP) |

---

## Project Structure

```
walled-lake-masons/
├── prisma/
│   ├── schema.prisma          # Database schema (all models)
│   └── seed.ts                # Admin user + sample data seed
├── sanity/
│   ├── sanity.config.ts       # Sanity Studio configuration
│   ├── sanity.cli.ts
│   └── schemas/               # CMS content schemas
│       ├── page.ts
│       ├── event.ts
│       ├── announcement.ts
│       ├── lodgeDocument.ts
│       ├── gallery.ts
│       ├── hallRental.ts
│       ├── navigation.ts
│       └── footer.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (Header, Footer, GA4)
│   │   ├── page.tsx                   # Homepage
│   │   ├── about-freemasonry/         # Public: About Freemasonry
│   │   ├── about-lodge/               # Public: About the Lodge
│   │   ├── how-to-join/               # Public: How to Join (info only)
│   │   ├── events/                    # Public: Event listing + detail pages
│   │   ├── hall-rental/               # Public: Hall rental + inquiry form
│   │   ├── donate/                    # Public: Stripe donation
│   │   ├── contact/                   # Public: Contact form
│   │   ├── links/                     # Public: Masonic links
│   │   ├── auth/                      # Sign in / sign up pages
│   │   ├── member/                    # Protected: Member portal
│   │   │   ├── dashboard/
│   │   │   ├── calendar/
│   │   │   ├── directory/
│   │   │   ├── documents/
│   │   │   ├── profile/
│   │   │   ├── announcements/[slug]/  # With comment thread
│   │   │   └── events/[id]/          # With comment thread + RSVP
│   │   ├── admin/                     # Protected: Admin only
│   │   │   ├── members/               # Member management
│   │   │   └── moderation/            # Comment moderation queue
│   │   └── api/                       # API routes
│   │       ├── auth/
│   │       ├── comments/
│   │       ├── rsvp/
│   │       ├── events/[id]/ics/
│   │       ├── hall-rental/
│   │       ├── contact/
│   │       ├── stripe/
│   │       ├── member/profile/
│   │       └── admin/
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── ui/             # StagingBanner
│   │   ├── auth/           # SignInForm, SignUpForm
│   │   ├── events/         # EventCard
│   │   ├── comments/       # CommentThread, CommentItem, CommentForm
│   │   ├── member/         # MemberNav, MemberCalendar, ProfileForm
│   │   ├── admin/          # AdminMemberActions, AdminCommentActions
│   │   ├── donations/      # DonationForm
│   │   ├── HallRentalForm.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Analytics.tsx
│   │   └── SessionProvider.tsx
│   └── lib/
│       ├── auth.ts          # NextAuth config + helpers
│       ├── prisma.ts        # Prisma singleton
│       ├── sanity.ts        # Sanity client + GROQ queries
│       ├── stripe.ts        # Stripe client
│       ├── email.ts         # Nodemailer
│       ├── ics.ts           # ICS calendar generation
│       ├── rate-limit.ts    # In-memory rate limiter
│       └── utils.ts         # Dates, formatting, cn()
├── .env.example             # All required env vars documented
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

### 1. Clone and Install

```bash
git clone <repo>
cd walled-lake-masons
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local and fill in all values
```

See `.env.example` for documentation on each variable.

### 3. Set Up Database

```bash
# Push schema to PostgreSQL
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed initial admin user
SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD=YourPassword npm run db:seed
```

### 4. Set Up Sanity CMS

```bash
# Create a Sanity project at sanity.io
# Copy the project ID into .env.local

cd sanity
npx sanity login
npx sanity init --project-id YOUR_PROJECT_ID --dataset production
npx sanity deploy     # Deploy Studio to sanity.io/manage
```

### 5. Run Development Server

```bash
npm run dev
# App: http://localhost:3000
# Sanity Studio: http://localhost:3333
```

---

## Deployment (Vercel)

### 1. Connect Repository

Push to GitHub and import into Vercel.

### 2. Environment Variables

Add all variables from `.env.example` to your Vercel project settings.
Set `NEXT_PUBLIC_SITE_URL` to your production domain.

### 3. Database

Use a managed PostgreSQL provider (Supabase, Neon, Railway, PlanetScale).
Set `DATABASE_URL` to your connection string.

### 4. Staging Environment

In your staging Vercel deployment:
- Set `STAGING=true`
- Set `NEXT_PUBLIC_SITE_URL` to staging URL
- A yellow banner will appear on all pages
- `robots: noindex, nofollow` is automatically set

### 5. Stripe Webhook

After deploying, configure the Stripe webhook endpoint:
```
https://your-domain.com/api/stripe/webhook
```
Events to listen for:
- `checkout.session.completed`
- `checkout.session.expired`

### 6. Bootstrap Admin

After deployment:
```bash
# Run seed to create initial admin user
npx prisma db seed
```
Or PATCH `/api/admin/members/{id}` to approve and set role to ADMIN.

---

## Member Portal Access

1. New members register at `/auth/signup`
2. Admin approves them in `/admin/members`
3. Members access portal at `/member/dashboard`

### Comment Moderation

- First comment from any member is held for approval
- Admin approves at `/admin/moderation`
- Once approved, future comments are auto-approved
- Members can edit own comments within **15 minutes**
- Members can delete own comments anytime
- Admins can remove any comment
- Removed comments show as `[Comment removed]`

---

## Content Management

**Actual current state:** Announcements, Documents, Photo Gallery, Volunteer Events, and
Members are all managed through the app's own `/admin` panel, backed directly by
Prisma/Postgres — not Sanity. This is true even though Sanity is installed and scaffolded
(see `sanity/schemas/`) — it's just not wired into any page's data-fetching. Don't assume
content lives in Sanity without checking; grep for `from '@/lib/sanity'` to see what (if
anything) actually calls it before relying on Sanity docs elsewhere in this file.

| Content Type | Managed via |
|---|---|
| Announcements | `/admin/announcements` → Prisma (`Announcement` model) |
| Lodge Documents | `/admin/documents` → Prisma (`LodgeDocument` model) + Vercel Blob storage |
| Photo Galleries | `/admin/gallery` → Prisma + Vercel Blob storage |
| Volunteer Events | `/admin/volunteer` → Prisma |
| Members | `/admin/members` → Prisma (`User` model) |
| Comment Moderation | `/admin/moderation` → Prisma (`Comment` model) |
| Static page copy (About, How to Join, etc.) | Hardcoded JSX in `src/app/**/page.tsx` — edit the file directly |
| Site-wide branding (name, address, contact, socials) | `src/config/site.ts` — single source of truth, see below |

Sanity remains available if you want to migrate static page content to a real CMS later,
but as of this writing it's dead weight in the dependency tree.

---

## Role System

| Role | Capabilities |
|---|---|
| **Public** | View public pages, events |
| **MEMBER** | Dashboard, calendar, directory, documents, RSVP, comments, profile |
| **ADMIN** | All MEMBER capabilities + member management, comment moderation |

---

## Security Notes

- Passwords hashed with bcrypt (cost factor 12)
- JWT sessions with server-side validation
- All member routes protected server-side via `requireMember()`
- All admin routes protected via `requireAdmin()`
- Comment API includes rate limiting (10 comments/minute/user)
- Stripe webhook validated with signature verification
- Contact and rental forms include honeypot spam protection
- XSS headers set globally via `next.config.ts`
- Comment content is length-limited (2000 chars)
- Soft deletes — removed comments are never permanently deleted (audit trail)

---

## Analytics

Google Analytics GA4 is loaded only in production (`NODE_ENV=production`).
Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your environment variables.

---

## For Future Maintainers

### Adding New Pages

Create a file at `src/app/your-page/page.tsx`. Export a `metadata` object for SEO.

### Adding Content Types

New content types (in practice, as of this writing) are added the same way Announcements/
Documents/Gallery were: a Prisma model + an `/admin` CRUD page + a public-facing read
route, not via Sanity — see "Content Management" above.

### Updating Member Portal

Protected routes go in `src/app/member/`. They are guarded by the layout at
`src/app/member/layout.tsx` which calls `requireMember()`.

### Database Migrations

```bash
npm run db:migrate    # Create and apply migration
npm run db:generate   # Regenerate Prisma client
```

---

## Reusing This as a Template for a Different Organization

This codebase was built for a Masonic lodge, but the underlying architecture — auth with
admin-approval, role-based member portal, event calendar, volunteer signup, document
library, announcements, donations — is generic enough to fit most membership-based
communities (a church, a club, a nonprofit chapter). If you're forking this for a
different organization, here's what's actually organization-specific vs. what's reusable
as-is.

### Set up independent infrastructure first

Before changing any code: create a **separate** GitHub repo, a **separate** Neon (or
other Postgres) database, and a **separate** Vercel project. Nothing here should share
infrastructure with the original lodge site — different `DATABASE_URL`, different
`AUTH_SECRET`, different Vercel Blob store, different domain. Sharing any of these would
mix the two organizations' data or let a deploy of one affect the other.

### Start here: `src/config/site.ts`

This file is already labeled the single source of truth for branding — name, tagline,
address, contact emails, social links, established year. Update it first; a large amount
of the site (header, footer, structured data, metadata) pulls from it automatically.

### Masonic-specific things that need attention

- **`prisma/schema.prisma` — `User` model**: `eaDate`, `fcDate`, `mmDate` are Masonic
  degree dates (Entered Apprentice / Fellowcraft / Master Mason). `title` and
  `joinedLodge` are generically named but comment-documented as lodge-specific. Rename,
  repurpose, or drop these depending on what the new organization tracks about its
  members — but changing the schema means running `npm run db:migrate` and updating every
  place these fields are read/written (profile form, directory page, admin member view).
- **Static pages with Masonic content**: `src/app/about-freemasonry/`,
  `src/app/how-to-join/`, and `src/app/links/` (Masonic links) are lodge-specific and
  will need to be rewritten or removed. `src/app/about-lodge/` is a reasonable "About Us"
  page shape but the copy is lodge-specific.
- **The "no recruiting" content rule**: The `README`'s Masonic Principle section below,
  and the actual copy on `how-to-join`, enforce "educate, don't recruit" — a Masonic
  norm, not a general one. A church almost certainly wants active invitations/CTAs, the
  opposite instinct from what this code currently does.
- **Images and logo**: everything in `/public` (lodge photos, crest/logo, merchandise
  designs) needs replacing.
- **`NEXT_PUBLIC_GA_MEASUREMENT_ID`**: needs its own GA4 property, not the lodge's.
- **Pages that are probably reusable as-is (content only, not structure)**: `events/`,
  `hall-rental/` (→ "facility rental" for a church), `donate/`, `contact/`,
  `merchandise/`, and the entire `member/` and `admin/` portal.

### First deploy checklist

1. New GitHub repo, new Vercel project, new Neon database.
2. Copy `.env.example` → `.env.local`, fill in the new organization's values.
3. `npm run db:push` (or `db:migrate` if you've changed the schema) against the new database.
4. `SEED_ADMIN_EMAIL=... SEED_ADMIN_PASSWORD=... npm run db:seed` to create the first admin.
5. Update `src/config/site.ts`.
6. Work through the Masonic-specific items above.
7. Deploy, then re-run the seed (or use the `/admin/members` PATCH route) against production to bootstrap the production admin account — the local seed only touches your local/dev database.

---

## Masonic Principle

> "To be one, ask one."

This website educates. It does not recruit. No calls-to-action soliciting membership
are permitted anywhere on this site.
 
---

*Walled Lake Lodge #528 F&AM — Established 1949 — Oakland County, Michigan*
