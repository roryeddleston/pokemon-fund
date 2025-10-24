import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation (Singleton)",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "Pokémon Card Fund",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nav",
      title: "Navigation Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          title: "Nav Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((val) => {
                  if (typeof val !== "string") return "Required";
                  const isRoute = val.startsWith("/");
                  const isUrl = /^https?:\/\//.test(val);
                  return (
                    isRoute || isUrl || "Use a route like /market or a full URL"
                  );
                }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      initialValue: [
        { label: "Overview", href: "/" },
        { label: "Market", href: "/market" },
        { label: "Thesis", href: "/thesis" },
        { label: "Structure & Terms", href: "/terms" },
        { label: "Risk", href: "/risk" },
        { label: "Contact", href: "/contact" },
      ],
      validation: (Rule) => Rule.min(4).max(6),
    }),
  ],
});
