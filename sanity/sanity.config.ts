import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'wl528',
  title: 'Walled Lake Lodge #528',

  projectId: 'dahxezmh',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),

            S.listItem()
              .title('Public Events')
              .child(
                S.documentTypeList('event')
                  .filter('visibility == "Public"')
                  .title('Public Events')
              ),

            S.listItem()
              .title('Member Events')
              .child(
                S.documentTypeList('event')
                  .filter('visibility == "Member"')
                  .title('Member Events')
              ),

            S.listItem()
              .title('Announcements')
              .child(
                S.documentTypeList('announcement').title('Announcements')
              ),

            S.listItem()
              .title('Documents Library')
              .child(
                S.documentTypeList('lodgeDocument').title('Documents')
              ),

            S.listItem()
              .title('Photo Galleries')
              .child(
                S.documentTypeList('gallery').title('Galleries')
              ),

            S.listItem()
              .title('Hall Rental Content')
              .child(
                S.documentTypeList('hallRental').title('Hall Rental')
              ),

            S.divider(),

            S.listItem()
              .title('Navigation')
              .child(
                S.documentTypeList('navigation').title('Navigation')
              ),

            S.listItem()
              .title('Footer')
              .child(
                S.documentTypeList('footer').title('Footer')
              ),
          ]),
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})