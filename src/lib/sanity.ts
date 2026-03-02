import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Environment variables (set these in Vercel + .env.local)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Hard fail early if missing (better than weird runtime errors)
if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!dataset) throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')

// ✅ This is what your app imports everywhere
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// ✅ urlFor helper used by hall-rental page
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}

// ✅ Centralized queries
export const QUERIES = {
  publicEvents: `*[
    _type == "event" &&
    visibility == "public" &&
    startAt >= dateTime(now()) - 60*60*24*7
  ] | order(startAt asc) [0...50] {
    _id,
    title,
    "slug": slug.current,
    startAt,
    endAt,
    location,
    address,
    visibility,
    seoDescription,
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
} as const