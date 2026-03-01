import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lodgeDocument',
  title: 'Lodge Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Minutes', value: 'minutes' },
          { title: 'Bylaws & Rules', value: 'bylaws' },
          { title: 'Forms', value: 'forms' },
          { title: 'Educational', value: 'educational' },
          { title: 'Reports', value: 'reports' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'file',
      title: 'Document File',
      type: 'file',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})
