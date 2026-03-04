import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin()

  if (!session) {
    redirect('/member/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 pb-4 border-b border-stone-200 flex items-center gap-3">
        <span className="bg-navy-800 text-gold-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
          Admin
        </span>

        <nav aria-label="Admin navigation" className="flex gap-4">
          <a
            href="/admin/members"
            className="text-sm text-navy-700 hover:text-navy-900 font-medium"
          >
            Members
          </a>

          <a
            href="/admin/moderation"
            className="text-sm text-navy-700 hover:text-navy-900 font-medium"
          >
            Comment Moderation
          </a>

          <a
            href="/member/dashboard"
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            ← Member Portal
          </a>
        </nav>
      </div>

      {children}
    </div>
  )
}