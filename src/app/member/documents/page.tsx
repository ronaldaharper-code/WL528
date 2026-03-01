import type { Metadata } from 'next'
import { sanityClient, QUERIES } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Documents Library',
  robots: { index: false },
}

const CATEGORY_LABELS: Record<string, string> = {
  minutes: 'Meeting Minutes',
  bylaws: 'Bylaws & Rules',
  forms: 'Forms',
  educational: 'Educational',
  reports: 'Reports',
  other: 'Other',
}

export default async function DocumentsPage() {
  let documents: any[] = []
  try {
    documents = await sanityClient.fetch(QUERIES.documents)
  } catch {
    documents = []
  }

  // Group by category
  const grouped = documents.reduce<Record<string, any[]>>((acc, doc) => {
    const cat = doc.category ?? 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(doc)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Documents Library</h1>
        <p className="text-stone-500 text-sm mt-1">
          Lodge documents available to members. All downloads are for member use only.
        </p>
      </header>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-stone-400 text-sm">No documents available at this time.</p>
      ) : (
        Object.entries(grouped).map(([category, docs]) => (
          <section key={category} aria-labelledby={`cat-${category}`}>
            <h2
              id={`cat-${category}`}
              className="font-serif text-lg font-bold text-navy-800 mb-3 pb-2 border-b border-stone-200"
            >
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <div className="space-y-2">
              {docs.map((doc: any) => (
                <div key={doc._id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-shrink-0 text-stone-400" aria-hidden="true">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy-800 text-sm">{doc.title}</p>
                    {doc.description && (
                      <p className="text-stone-500 text-xs mt-0.5">{doc.description}</p>
                    )}
                    <p className="text-stone-400 text-xs mt-1">
                      {formatDate(doc.publishedAt)}
                    </p>
                  </div>
                  {doc.fileUrl && (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="btn-secondary text-sm flex-shrink-0"
                    >
                      Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
