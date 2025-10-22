import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'pitch', title: 'Pitch'}
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'pitchCards',
      title: 'Pitch Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', validation: (R:any)=>R.required()},
          {name: 'body', type: 'text'}
        ]
      }],
      group: 'pitch'
    })
  ],
})