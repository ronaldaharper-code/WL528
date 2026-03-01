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

All content is managed in **Sanity Studio** (no coding required):

| Content Type | Description |
|---|---|
| Pages | Static page content |
| Events | Public & member-only events |
| Announcements | Member-only announcements |
| Lodge Documents | PDFs, minutes, bylaws |
| Photo Galleries | Image galleries |
| Hall Rental | Hall rental page content |
| Navigation | Header nav items |
| Footer | Footer contact info, social links |

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

1. Create a schema file in `sanity/schemas/`
2. Register it in `sanity/schemas/index.ts`
3. Add a GROQ query in `src/lib/sanity.ts`

### Updating Member Portal

Protected routes go in `src/app/member/`. They are guarded by the layout at
`src/app/member/layout.tsx` which calls `requireMember()`.

### Database Migrations

```bash
npm run db:migrate    # Create and apply migration
npm run db:generate   # Regenerate Prisma client
```

---

## Masonic Principle

> "To be one, ask one."

This website educates. It does not recruit. No calls-to-action soliciting membership
are permitted anywhere on this site.
 
---

*Walled Lake Lodge #528 F&AM — Established 1949 — Oakland County, Michigan*
