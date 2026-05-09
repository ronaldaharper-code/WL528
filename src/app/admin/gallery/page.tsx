import { prisma } from '@/lib/prisma'
import { PhotoUploadForm } from '@/components/admin/PhotoUploadForm'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  const photos = await prisma.photo.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Photo Gallery</h1>
        <p className="text-stone-500 text-sm mt-1">
          Photos uploaded here appear on the public{' '}
          <a href="/gallery" target="_blank" className="text-navy-600 underline">
            Photo Gallery
          </a>{' '}
          page.
        </p>
      </header>

      <PhotoUploadForm />

      <section>
        <h2 className="font-serif text-lg font-bold text-navy-800 mb-4">
          Gallery ({photos.length})
        </h2>

        {photos.length === 0 ? (
          <p className="text-stone-400 text-sm">No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title ?? 'Gallery photo'}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  {photo.title && (
                    <p className="text-sm font-medium text-navy-800 truncate">{photo.title}</p>
                  )}
                  {photo.caption && (
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{photo.caption}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-stone-400">{formatDate(photo.createdAt)}</span>
                    <DeleteButton endpoint={`/api/admin/gallery/${photo.id}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
