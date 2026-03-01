import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Member Directory',
  robots: { index: false },
}

export default async function MemberDirectoryPage() {
  const session = await auth()

  const members = await prisma.user.findMany({
    where: {
      approved: true,
      profileVisible: true,
    },
    select: {
      id: true,
      displayName: true,
      name: true,
      title: true,
      joinedLodge: true,
      bio: true,
      // Only show email to other members (not on public)
      email: true,
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Member Directory</h1>
        <p className="text-stone-500 text-sm mt-1">
          Members who have opted to appear in the directory.
        </p>
        <p className="text-stone-400 text-xs mt-1">
          This directory is visible to lodge members only. Contact information is not shared publicly.
        </p>
      </header>

      {members.length === 0 ? (
        <p className="text-stone-400 text-sm">No members in the directory yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map((member) => (
            <div key={member.id} className="card p-5">
              {/* Avatar placeholder */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-400 font-serif font-bold text-sm">
                    {(member.displayName ?? member.name ?? '?')[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-navy-800 text-sm">
                    {member.displayName ?? member.name}
                  </p>
                  {member.title && (
                    <p className="text-gold-600 text-xs font-medium">{member.title}</p>
                  )}
                </div>
              </div>

              {member.bio && (
                <p className="text-stone-600 text-xs leading-relaxed mb-3 line-clamp-3">
                  {member.bio}
                </p>
              )}

              <div className="text-xs text-stone-500 space-y-0.5">
                {member.joinedLodge && <p>Lodge since: {member.joinedLodge}</p>}
                {/* Only show email to fellow members */}
                {session && <p>{member.email}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
