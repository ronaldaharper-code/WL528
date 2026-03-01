import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallRental',
  title: 'Hall Rental Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Hall Rental',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      initialValue: 125,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Room Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'rentalRates',
      title: 'Rental Rate Info',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'policies',
      title: 'Policies & Rules',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hall Rental Page' }
    },
  },
})
