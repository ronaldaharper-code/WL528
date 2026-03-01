import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { AdminMemberActions } from '@/components/admin/AdminMemberActions'

export const metadata: Metadata = {
  title: 'Manage Members — Admin',
  robots: { index: false },
}

export default async function AdminMembersPage() {
  const members = await prisma.user.findMany({
    orderBy: [{ approved: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      approved: true,
      commentApproved: true,
      title: true,
      createdAt: true,
    },
  })

  const pending = members.filter((m) => !m.approved)
  const active = members.filter((m) => m.approved)

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl font-bold text-navy-900">Member Management</h1>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <section aria-labelledby="pending-heading">
          <h2 id="pending-heading" className="font-serif text-lg font-bold text-navy-800 mb-4">
            Pending Approval ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((member) => (
              <div key={member.id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-amber-50 border-amber-200">
                <div className="flex-1">
                  <p className="font-medium text-navy-800">{member.name ?? '(No name)'}</p>
                  <p className="text-stone-500 text-sm">{member.email}</p>
                  <p className="text-stone-400 text-xs">Registered {formatDate(member.createdAt)}</p>
                </div>
                <AdminMemberActions memberId={member.id} approved={member.approved} role={member.role} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active Members */}
      <section aria-labelledby="active-heading">
        <h2 id="active-heading" className="font-serif text-lg font-bold text-navy-800 mb-4">
          Active Members ({active.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left">
                <th className="pb-3 font-semibold text-stone-500 pr-4">Name</th>
                <th className="pb-3 font-semibold text-stone-500 pr-4">Email</th>
                <th className="pb-3 font-semibold text-stone-500 pr-4">Role</th>
                <th className="pb-3 font-semibold text-stone-500 pr-4">Comments</th>
                <th className="pb-3 font-semibold text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {active.map((member) => (
                <tr key={member.id}>
                  <td className="py-3 pr-4 font-medium text-navy-800">
                    {member.name}
                    {member.title && <span className="text-xs text-stone-400 block">{member.title}</span>}
                  </td>
                  <td className="py-3 pr-4 text-stone-600">{member.email}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs rounded px-2 py-0.5 font-medium ${
                      member.role === 'ADMIN'
                        ? 'bg-navy-100 text-navy-700'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs ${member.commentApproved ? 'text-green-600' : 'text-amber-600'}`}>
                      {member.commentApproved ? 'Auto-approved' : 'First-comment pending'}
                    </span>
                  </td>
                  <td className="py-3">
                    <AdminMemberActions memberId={member.id} approved={member.approved} role={member.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
