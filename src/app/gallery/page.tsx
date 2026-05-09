import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: `Photos from events and lodge life at ${siteConfig.name} in Walled Lake, Michigan.`,
}

export default async function GalleryPage() {
  const photos = await prisma.photo.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <p className="eyebrow mb-3">Lodge Life</p>
        <h1 className="heading-lg mb-4">Photo Gallery</h1>
        <p className="lead max-w-2xl">
          Moments from events, degrees, community service, and brotherhood at {siteConfig.name}.
        </p>
      </header>

      {photos.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-stone-200">
          <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="font-serif text-lg font-semibold text-navy-800 mb-1">No Photos Yet</p>
          <p className="text-stone-500 text-sm">Check back soon — photos will be added here.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <figure key={photo.id} className="break-inside-avoid rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.imageUrl}
                alt={photo.title ?? 'Lodge photo'}
                className="w-full object-cover"
                loading="lazy"
              />
              {(photo.title || photo.caption) && (
                <figcaption className="p-3">
                  {photo.title && (
                    <p className="text-sm font-semibold text-navy-800">{photo.title}</p>
                  )}
                  {photo.caption && (
                    <p className="text-xs text-stone-500 mt-0.5">{photo.caption}</p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
