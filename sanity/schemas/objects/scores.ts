import { defineType, defineField } from "sanity";

export const scores = defineType({
  name: "scores",
  title: "Scores",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: "effectiveness",
      title: "Effectiveness",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: "ux",
      title: "UX",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: "trust",
      title: "Trust",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: "accessibility",
      title: "Accessibility",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
    defineField({
      name: "support",
      title: "Support",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(10),
    }),
  ],
});
