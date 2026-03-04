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
  useCdn: false
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}

export const QUERIES = {
  publicEvents: `*[
    _type == "event" &&
    visibility == "Public"
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

  // memberEvents: all events (public + member-only) from the last 7 days forward.
  // Currently mirrors allEvents with a time filter; no separate member visibility
  // model exists yet in Sanity, so members see everything.
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