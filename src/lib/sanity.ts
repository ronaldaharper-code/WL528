import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ============================================================
// GROQ QUERIES
// ============================================================

export const QUERIES = {
  publicEvents: `*[_type == "event" && visibility == "public" && startAt >= now()] | order(startAt asc) [0...20] {
    _id, title, slug, startAt, endAt, location, address, visibility,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    seoDescription
  }`,

  memberEvents: `*[_type == "event" && visibility == "member" && startAt >= now()] | order(startAt asc) [0...20] {
    _id, title, slug, startAt, endAt, location, address, visibility,
    "imageUrl": image.asset->url,
    allowRSVP, allowVolunteers, volunteerRoles
  }`,

  eventBySlug: (slug: string) => `*[_type == "event" && slug.current == "${slug}"][0] {
    _id, title, slug, startAt, endAt, location, address, visibility,
    description, "imageUrl": image.asset->url, "imageAlt": image.alt,
    maxAttendees, allowRSVP, allowVolunteers, volunteerRoles, seoDescription
  }`,

  announcements: `*[_type == "announcement"] | order(pinned desc, publishedAt desc) [0...20] {
    _id, title, slug, publishedAt, pinned,
    "excerpt": pt::text(body)[0...200]
  }`,

  announcementBySlug: (slug: string) => `*[_type == "announcement" && slug.current == "${slug}"][0] {
    _id, title, slug, publishedAt, pinned, body, attachments
  }`,

  documents: `*[_type == "lodgeDocument"] | order(publishedAt desc) {
    _id, title, category, description, publishedAt,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename
  }`,

  hallRental: `*[_type == "hallRental"][0] {
    title, heroImage, intro, capacity, amenities, gallery, rentalRates, policies
  }`,

  galleries: `*[_type == "gallery"] | order(_createdAt desc) {
    _id, title, slug, description, featured,
    "coverUrl": photos[0].asset->url,
    "coverAlt": photos[0].alt
  }`,
}
