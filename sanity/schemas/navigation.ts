import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      initialValue: 'Main Navigation',
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() },
            { name: 'href', title: 'URL / Path', type: 'string', validation: (r) => r.required() },
            { name: 'external', title: 'Open in new tab', type: 'boolean', initialValue: false },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
  ],
})
