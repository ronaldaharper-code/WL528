import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from '@/components/member/ProfileForm'
import { ChangePasswordForm } from '@/components/member/ChangePasswordForm'

export const metadata: Metadata = {
  title: 'My Profile',
  robots: { index: false },
}

export default async function ProfilePage() {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: {
      id: true,
      name: true,
      displayName: true,
      email: true,
      phone: true,
      bio: true,
      title: true,
      joinedLodge: true,
      eaDate: true,
      fcDate: true,
      mmDate: true,
      profileVisible: true,
    },
  })

  if (!user) return null

  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="font-serif text-2xl font-bold text-navy-900">My Profile</h1>
        <p className="text-stone-500 text-sm mt-1">
          Update your profile information visible in the member directory.
        </p>
      </header>

      <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
        <ProfileForm user={user} />
      </div>

      <section>
        <h2 className="font-serif text-lg font-bold text-navy-900 mb-1">Change Password</h2>
        <p className="text-stone-500 text-sm mb-4">
          Update your sign-in password. You&apos;ll need to enter your current password to confirm.
        </p>
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
          <ChangePasswordForm />
        </div>
      </section>
    </div>
  )
}
