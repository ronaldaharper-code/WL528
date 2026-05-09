import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { DocumentForm } from '@/components/admin/DocumentForm'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

const CATEGORY_LABELS: Record<string, string> = {
  minutes:     'Meeting Minutes',
  bylaws:      'Bylaws & Rules',
  forms:       'Forms',
  educational: 'Educational',
  reports:     'Reports',
  other:       'Other',
}

export default async function AdminDocumentsPage() {
  const documents = await prisma.lodgeDocument.findMany({ orderBy: { publishedAt: 'desc' } })

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Documents</h1>
        <p className="text-stone-500 text-sm mt-1">Add links to lodge documents. Use Google Drive, Dropbox, or any public file URL.</p>
      </header>

      <DocumentForm />

      <section>
        <h2 className="font-serif text-lg font-bold text-navy-800 mb-4">Library ({documents.length})</h2>
        {documents.length === 0 ? (
          <p className="text-stone-400 text-sm">No documents yet.</p>
        ) : (
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="card p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-navy-800 text-sm">{doc.title}</p>
                  <p className="text-stone-400 text-xs mt-0.5">
                    {CATEGORY_LABELS[doc.category] ?? doc.category} · {formatDate(doc.publishedAt)}
                  </p>
                  {doc.description && <p className="text-stone-500 text-xs mt-0.5">{doc.description}</p>}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-navy-600 hover:underline">
                    View
                  </a>
                  <DeleteButton endpoint={`/api/admin/documents/${doc.id}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
