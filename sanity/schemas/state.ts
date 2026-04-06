import { defineType, defineField } from "sanity";

export const state = defineType({
  name: "state",
  title: "State",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
    }),
    defineField({
      name: "featured_providers",
      title: "Featured Providers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "provider" }],
        },
      ],
    }),
  ],
});
