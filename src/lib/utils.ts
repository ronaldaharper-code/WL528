import { format, formatDistanceToNow, isAfter } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

const LODGE_TZ = 'America/Detroit'

export function formatDate(date: string | Date, fmt = 'MMMM d, yyyy') {
  const d = typeof date === 'string' ? new Date(date) : date
  const zoned = toZonedTime(d, LODGE_TZ)
  return format(zoned, fmt)
}

export function formatDateTime(date: string | Date) {
  return formatDate(date, "EEEE, MMMM d, yyyy 'at' h:mm a")
}

export function formatTime(date: string | Date) {
  return formatDate(date, 'h:mm a')
}

export function timeAgo(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
