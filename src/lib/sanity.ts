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