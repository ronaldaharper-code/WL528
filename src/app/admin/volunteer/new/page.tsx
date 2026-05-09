import Link from 'next/link'
import { CreateEventForm } from '@/components/admin/volunteer/CreateEventForm'

export default function NewVolunteerEventPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/volunteer" className="text-sm text-navy-600 hover:underline">
          ← Volunteer Events
        </Link>
        <h1 className="font-serif text-2xl font-bold text-navy-900 mt-2">New Volunteer Event</h1>
        <p className="text-stone-500 text-sm mt-1">
          After creating the event you can add volunteer roles on the next page.
        </p>
      </div>
      <CreateEventForm />
    </div>
  )
}
