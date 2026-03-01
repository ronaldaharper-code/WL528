import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate, timeAgo } from '@/lib/utils'
import { AdminCommentActions } from '@/components/admin/AdminCommentActions'

export const metadata: Metadata = {
  title: 'Comment Moderation — Admin',
  robots: { index: false },
}

export default async function ModerationPage() {
  const [pending, recent] = await Promise.all([
    prisma.comment.findMany({
      where: { status: 'PENDING' },
      include: { author: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.comment.findMany({
      where: { status: { in: ['APPROVED', 'REMOVED'] } },
      include: { author: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ])

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl font-bold text-navy-900">Comment Moderation</h1>

      {/* Pending Queue */}
      <section aria-labelledby="queue-heading">
        <h2 id="queue-heading" className="font-serif text-lg font-bold text-navy-800 mb-4">
          Pending Review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-stone-400 text-sm">No comments awaiting review.</p>
        ) : (
          <div className="space-y-4">
            {pending.map((comment) => (
              <div key={comment.id} className="card p-5 bg-amber-50 border-amber-200">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-medium text-navy-800 text-sm">
                      {comment.author.name ?? comment.author.email}
                    </p>
                    <p className="text-stone-400 text-xs">
                      {timeAgo(comment.createdAt)} &middot; {comment.entityType}
                    </p>
                  </div>
                  <AdminCommentActions commentId={comment.id} status={comment.status} />
                </div>
                <p className="text-stone-700 text-sm bg-white rounded p-3 border border-amber-200">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Comments */}
      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="font-serif text-lg font-bold text-navy-800 mb-4">
          Recent Comments
        </h2>
        <div className="space-y-3">
          {recent.map((comment) => (
            <div key={comment.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs rounded px-2 py-0.5 font-medium ${
                      comment.status === 'APPROVED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {comment.status}
                    </span>
                    <span className="text-stone-400 text-xs">{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="text-stone-700 text-sm line-clamp-2">{comment.content}</p>
                  <p className="text-stone-400 text-xs mt-1">
                    by {comment.author.name ?? comment.author.email}
                  </p>
                </div>
                {comment.status === 'APPROVED' && (
                  <AdminCommentActions commentId={comment.id} status={comment.status} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
