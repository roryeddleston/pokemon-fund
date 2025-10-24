import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "pitch", title: "Pitch" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required().min(8),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required().min(16),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      group: "hero",
      initialValue: "Learn More",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pitchCards",
      title: "Pitch Cards",
      type: "array",
      group: "pitch",
      of: [
        defineArrayMember({
          type: "object",
          name: "pitchCard",
          title: "Pitch Card",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
      validation: (Rule) => Rule.min(2).max(6),
    }),
  ],
});
