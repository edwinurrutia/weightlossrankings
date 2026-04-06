import { defineType, defineField } from "sanity";

export const fdaWarning = defineType({
  name: "fdaWarning",
  title: "FDA Warning",
  type: "object",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
