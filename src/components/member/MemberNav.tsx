'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Role } from '@prisma/client'

interface Props {
  role: Role
}

const MEMBER_LINKS = [
  { label: 'Dashboard', href: '/member/dashboard', icon: '⊞' },
  { label: 'Calendar', href: '/member/calendar', icon: '◻' },
  { label: 'Directory', href: '/member/directory', icon: '◈' },
  { label: 'Documents', href: '/member/documents', icon: '◉' },
  { label: 'My Profile', href: '/member/profile', icon: '◎' },
]

const ADMIN_LINKS = [
  { label: 'Manage Members', href: '/admin/members', icon: '◫' },
  { label: 'Comment Queue', href: '/admin/moderation', icon: '◬' },
]

export function MemberNav({ role }: Props) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav aria-label="Member portal navigation">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-3">
        Member Portal
      </p>
      <ul className="space-y-1">
        {MEMBER_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                isActive(link.href)
                  ? 'bg-navy-800 text-white font-medium'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-navy-800'
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              <span aria-hidden="true" className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {role === Role.ADMIN && (
        <>
          <div className="my-3 border-t border-stone-200" />
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-3">
            Administration
          </p>
          <ul className="space-y-1">
            {ADMIN_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                    isActive(link.href)
                      ? 'bg-navy-800 text-white font-medium'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-navy-800'
                  }`}
                >
                  <span aria-hidden="true" className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  )
}
