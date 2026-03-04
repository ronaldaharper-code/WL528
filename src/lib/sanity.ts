import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-24'

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!dataset) throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // We want fresh content and zero “why isn’t it updating” headaches while you’re building.
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * NOTE:
 * - Your Sanity data uses visibility values like "Public" (capital P).
 * - We keep queries permissive so nothing mysteriously disappears while content is being cleaned up.
 */
export const QUERIES = {
  // Public-facing events page
  publicEvents: `*[
    _type == "event" &&
    (visibility == "Public" || visibility == "public")
  ] | order(startAt asc) {
    _id,
    title,
    "slug": slug.current,
    startAt,
    endAt,
    location,
    address,
    visibility,
    seoDescription,
    body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`,

  // Member area may still reference this even if you “bypass” it in navigation.
  // Keep it so builds stop failing.
  memberEvents: `*[
    _type == "event" &&
    startAt >= dateTime(now()) - 60*60*24*7
  ] | order(startAt asc) [0...100] {
    _id,
    title,
    "slug": slug.current,
    startAt,
    endAt,
    location,
    address,
    visibility,
    seoDescription,
    body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`,

  allEvents: `*[
    _type == "event"
  ] | order(startAt asc) {
    _id,
    title,
    "slug": slug.current,
    startAt,
    endAt,
    location,
    address,
    visibility,
    seoDescription,
    body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`,

  eventBySlug: `*[
    _type == "event" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    startAt,
    endAt,
    location,
    address,
    visibility,
    seoDescription,
    body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`,

  // Member dashboard build error: QUERIES.announcements was missing
  announcements: `*[
    _type == "announcement"
  ] | order(coalesce(publishedAt, _createdAt) desc) [0...25] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    excerpt
  }`,

  // Member documents build error: QUERIES.documents was missing
  documents: `*[
    _type == "lodgeDocument"
  ] | order(coalesce(publishedAt, _createdAt) desc) [0...200] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    description,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename
  }`,

  // Optional: if you have a page system already wired
  pageBySlug: `*[
    _type == "page" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    "slug": slug.current,
    seoDescription,
    body
  }`,

  // Optional: navigation/footer commonly used by layout
  navigation: `*[_type == "navigation"][0]{
    _id,
    items
  }`,

  footer: `*[_type == "footer"][0]{
    _id,
    text,
    links
  }`,
} as const