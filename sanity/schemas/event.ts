import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Members Only', value: 'member' },
        ],
        layout: 'radio',
      },
      initialValue: 'public',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'startAt',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endAt',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location Name',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'maxAttendees',
      title: 'Max Attendees',
      type: 'number',
    }),
    defineField({
      name: 'allowRSVP',
      title: 'Allow RSVP',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'allowVolunteers',
      title: 'Allow Volunteer Sign-Ups',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'volunteerRoles',
      title: 'Volunteer Roles',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => !document?.allowVolunteers,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Event Date',
      name: 'startAtAsc',
      by: [{ field: 'startAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startAt',
      media: 'image',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle as string).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'No date',
      }
    },
  },
})
