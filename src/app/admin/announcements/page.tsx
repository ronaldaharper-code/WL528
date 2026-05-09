import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { AnnouncementForm } from '@/components/admin/AnnouncementForm'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ pinned: 'desc' }, { publishedAt: 'desc' }],
  })

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Announcements</h1>
        <p className="text-stone-500 text-sm mt-1">Post announcements visible to all members on their dashboard.</p>
      </header>

      <AnnouncementForm />

      <section>
        <h2 className="font-serif text-lg font-bold text-navy-800 mb-4">Posted ({announcements.length})</h2>
        {announcements.length === 0 ? (
          <p className="text-stone-400 text-sm">No announcements yet.</p>
        ) : (
          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a.id} className="card p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {a.pinned && <span className="text-xs bg-gold-100 text-gold-700 font-semibold px-2 py-0.5 rounded">Pinned</span>}
                    <p className="font-medium text-navy-800 text-sm">{a.title}</p>
                  </div>
                  {a.excerpt && <p className="text-stone-500 text-xs mt-0.5 line-clamp-1">{a.excerpt}</p>}
                  <p className="text-stone-400 text-xs mt-1">{formatDate(a.publishedAt)}</p>
                </div>
                <DeleteButton endpoint={`/api/admin/announcements/${a.id}`} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
