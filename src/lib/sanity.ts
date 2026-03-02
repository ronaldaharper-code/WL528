publicEvents: `*[
  _type == "event" &&
  visibility == "public" &&
  startAt >= dateTime(now()) - 60*60*24*7
] | order(startAt asc) [0...50] {
  _id, title, slug, startAt, endAt, location, address, visibility,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  seoDescription
}`,