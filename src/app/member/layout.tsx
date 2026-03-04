import { redirect } from 'next/navigation'
import { requireMember } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const session = await requireMember()
  if (!session) {
    redirect('/auth/signin?callbackUrl=/member/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  )
}
