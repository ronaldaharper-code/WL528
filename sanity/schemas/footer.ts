import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'lodgeName',
      title: 'Lodge Name',
      type: 'string',
      initialValue: 'Walled Lake Lodge #528 F&AM',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      initialValue: '1499 N Pontiac Trail\nWalled Lake, MI 48390',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'copyrightLine',
      title: 'Copyright Line',
      type: 'string',
      initialValue: '© Walled Lake Lodge #528 F&AM. All rights reserved.',
    }),
  ],
})
