export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { requireMember } from '@/lib/auth'
import { MemberNav } from '@/components/member/MemberNav'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const session = await requireMember()
  if (!session) {
    redirect('/auth/signin?callbackUrl=/member/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 flex-shrink-0">
          <MemberNav role={session.user.role} />
        </aside>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
